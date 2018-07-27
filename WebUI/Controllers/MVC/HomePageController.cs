using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Plans.Services;
using BLL.DomainModel.Plans.BLOs;
using Common.DataStructures;
using BLL.DomainModel.Indicators.Symptoms.Services;
using BLL.DomainModel.Indicators.Symptoms.BLOs;
using Common;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Infare.FE4.WebUI.Code.WebSecurity.Implementation;
using BLL.DomainModel.Factors.Medicine.BLOs;

namespace WebUI.Controllers
{
    [Authorize]
    public class HomePageController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }


        // Private methods
        private Range<DateTime> GetMonthRangeWithPadding(DateTime refStartDate, DateTime refEndDate, int padding)
        {
            if(padding<0)
            {
                throw new Exception("GetMonthRangeWithPadding - padding must be non-negative");
            }

            // Start
            var startPaddedDate = refStartDate.AddMonths(-padding);
            var actualStartDate = new DateTime(startPaddedDate.Year, startPaddedDate.Month, 1).StartOfDay();

            // End
            var endPaddedDate = refEndDate.AddMonths(padding);
            var actualEndDate = new DateTime(endPaddedDate.Year, endPaddedDate.Month, 1).AddMonths(1).AddDays(-1).EndOfDay();

            //
            var range = new Range<DateTime>(actualStartDate, actualEndDate);
            return range;
        }

        // Constructor
        public HomePageController(
            ISymptomTypeService symptomTypeService,
            IMedicineTypeService medicineTypeService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService,
            WebSecurityManager webSecurityManager
            )
        {
            
            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;
            this.webSecurityManager = webSecurityManager;
        }

        // MVC methods
        public IActionResult Index()
        {
            if (this.webSecurityManager.GetCurrentUser() == null)
            {
                this.webSecurityManager.LogOut(); // special "hack" when switching between local and azure as authentication cookie gets stuck

            }

            return View();
        }
        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }



        // Startup
        [Route("HomePage/GetInitialData")]
        [HttpGet]
        public JsonResult GetInitialData()
        {

            // Get blos for initial bundle------------------------------------------------------------------------------------------------

            // Explanation: for both Schedule (FactorRecords) and HealthGraph (HealthStatusEntries) a window of 'available' data is loaded on the FE 
            //              so that not every navigation operation results in going back to the server (a form of caching)
            //              The padding works such that:
            //                  - If padding is set to 0, it will load data for the current month only
            //                  - Any value more than 0 will result in additional months ahead/before being added to the query
            int scheduleAvailableWindowPaddingInMonths = 0;
            int healthGraphAvailableWindowPaddingInMonths = 0;
            var refDate = DateTime.Now.Date;
            var initialScheduleDateRange = this.GetMonthRangeWithPadding(refDate, refDate, scheduleAvailableWindowPaddingInMonths);
            var initialHealthGraphRange = this.GetMonthRangeWithPadding(refDate, refDate, healthGraphAvailableWindowPaddingInMonths);


            
            var loggedInUser = this.webSecurityManager.GetCurrentUser();
            var symptomTypes = symptomTypeService.GetAllSymptomTypes();
            var medicineTypes = medicineTypeService.GetAllMedicineTypes(loggedInUser.ID, true);
            var plans = planService.GetPlans(loggedInUser.ID, true);
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(initialScheduleDateRange, loggedInUser.ID);
            var healthStatusEntries = this.healthStatusEntryService.GetHealthStatusEntries(initialHealthGraphRange, loggedInUser.ID, true);
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUser,
                SymptomTypes = symptomTypes,
                MedicineTypes = medicineTypes,
                Plans = plans,
                FactorRecordsForInitialRange = factorRecords,
                HealthStatusEntriesForInitialRange = healthStatusEntries
            };
            
            return Json(bundle);
        }


        // FactorRecords-------------------------------------------------------------------------------------------------------
        [Route("HomePage/MarkFactorRecordsAsTaken")]
        [HttpPost]
        public JsonResult MarkFactorRecordsAsTaken([FromBody] MarkFactorRecordsAsTakenModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;

            this.medicineFactorRecordService.MarkFactorRecordsAsTaken(model.FactorRecordCompositeIDs, model.NewTakenStatuses,(int)userID);
            return Json(true);
        }

        [Route("HomePage/GetFactorRecords")]
        [HttpPost]
        public JsonResult GetFactorRecords([FromBody] DateRangeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.medicineFactorRecordService.GetMedicineFactorRecords(model.DateRange, (int)userID);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------

        // Plans---------------------------------------------------------------------------------------------------------------
        [Route("HomePage/AddPlan")]
        [HttpPost]
        public JsonResult AddPlan([FromBody]Plan plan)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var planWithUpdatedID = this.planService.AddPlan(plan, (int)userID);
            return Json(planWithUpdatedID);
        }

        [Route("HomePage/UpdatePlan")]
        [HttpPost]
        public JsonResult UpdatePlan([FromBody]Plan plan)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var adjustedPlanWithUpdatedVersionIDs = this.planService.UpdatePlan(plan, (int)userID);
            return Json(adjustedPlanWithUpdatedVersionIDs);
        }

        [Route("HomePage/GetPlans")]
        [HttpGet]
        public JsonResult GetPlans()
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.planService.GetPlans((int)userID, true);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------

        // HealthStatusEntries-------------------------------------------------------------------------------------------------
        [Route("HomePage/AddHealthStatusEntry")]
        [HttpPost]
        public JsonResult AddHealthStatusEntry([FromBody]HealthStatusEntry blo)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var bloWithUpdatedID = this.healthStatusEntryService.AddHealthStatusEntry(blo, (int)userID);
            return Json(bloWithUpdatedID);
        }

        [Route("HomePage/GetHealthStatusEntries")]
        [HttpPost]
        public JsonResult GetHealthStatusEntries([FromBody] DateRangeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, (int)userID, true);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------


        // MedicineTypes-------------------------------------------------------------------------------------------------------

        [Route("HomePage/AddMedicineType")]
        [HttpPost]
        public JsonResult AddMedicineType([FromBody]MedicineType blo)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var bloWithUpdatedID = this.medicineTypeService.AddMedicineType(blo, (int)userID);
            return Json(bloWithUpdatedID);
        }

        [Route("HomePage/AddMedicineTypeSupplyEntry")]
        [HttpPost]
        public JsonResult AddMedicineTypeSupplyEntry([FromBody]AddMedicineTypeSupplyEntryModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            //var bloWithUpdatedID = this.medicineTypeService.AddMedicineType(blo, (int)userID);
            return Json(null);
        }


        [Route("HomePage/GetMedicineTypes")]
        [HttpPost]
        public JsonResult GetMedicineTypes()
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.medicineTypeService.GetAllMedicineTypes((int)userID, true);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------

        // Models
        public class AddMedicineTypeSupplyEntryModel
        {
            public int MedicineTypeID;
            public int SupplyQuantity;
        }

        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }
        public class MarkFactorRecordsAsTakenModel
        {
            public string[] FactorRecordCompositeIDs;
            public bool[] NewTakenStatuses;
        }

    }
}

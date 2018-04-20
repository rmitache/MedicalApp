using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Plans.Services;
using BLL.DomainModel.Plans.BLOs;
using Common.Datastructures;
using BLL.DomainModel.Indicators.Symptoms.History.Services;
using BLL.DomainModel.Indicators.Symptoms.History.BLOs;
using Common;
using BLL.DomainModel.Indicators.Symptoms.Library.Services;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

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
            IHealthStatusEntryService healthStatusEntryService
            )
        {
            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;

        }

        // MVC methods
        public IActionResult Index()
        {
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
            int scheduleAvailableWindowPaddingInMonths = 2;
            int healthGraphAvailableWindowPaddingInMonths = 0;
            var refDate = DateTime.Now.Date;
            var initialScheduleDateRange = this.GetMonthRangeWithPadding(refDate, refDate, scheduleAvailableWindowPaddingInMonths);
            var initialHealthGraphRange = this.GetMonthRangeWithPadding(refDate, refDate, healthGraphAvailableWindowPaddingInMonths);


            var loggedInUserJSON = new
            {
                ID = 1,
                Email = "john.doe@rocketmail.com",
                SignupDate = new DateTime(2017, 12, 28),
                BirthDate = new DateTime(1980, 10, 15),
                Language = "en"

            };
            var symptomTypes = symptomTypeService.GetAllSymptomTypes();
            var medicineTypes = medicineTypeService.GetAllMedicineTypes();
            var plans = planService.GetPlans(1, true);
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(initialScheduleDateRange, 1);
            var healthStatusEntries = this.healthStatusEntryService.GetHealthStatusEntries(initialHealthGraphRange, 1, true);
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUserJSON,
                SymptomTypes = symptomTypes,
                MedicineTypes = medicineTypes,
                Plans = plans,
                FactorRecordsForInitialRange = factorRecords,
                HealthStatusEntriesForInitialRange = healthStatusEntries
            };
            
            return Json(bundle);
        }


        // FactorRecords-------------------------------------------------------------------------------------------------------
        [Route("HomePage/AddFactorRecords")]
        [HttpPost]
        public JsonResult AddFactorRecords([FromBody]List<MedicineFactorRecord> factorRecords)
        {
            int userID = 1;
            var factorRecordsUpdatedIDs = this.medicineFactorRecordService.AddMedicineFactorRecords(factorRecords, userID);
            return Json(factorRecordsUpdatedIDs);
        }

        [Route("HomePage/GetFactorRecords")]
        [HttpPost]
        public JsonResult GetFactorRecords([FromBody] DateRangeModel model)
        {
            int userID = 1;
            var blos = this.medicineFactorRecordService.GetMedicineFactorRecords(model.DateRange, userID);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------

        // Plans---------------------------------------------------------------------------------------------------------------
        [Route("HomePage/AddPlan")]
        [HttpPost]
        public JsonResult AddPlan([FromBody]Plan plan)
        {
            int userID = 1;
            var planWithUpdatedID = this.planService.AddPlan(plan, userID);
            return Json(planWithUpdatedID);
        }

        [Route("HomePage/UpdatePlan")]
        [HttpPost]
        public JsonResult UpdatePlan([FromBody]Plan plan)
        {
            int userID = 1;
            var adjustedPlanWithUpdatedVersionIDs = this.planService.UpdatePlan(plan, userID);
            return Json(adjustedPlanWithUpdatedVersionIDs);
        }

        [Route("HomePage/GetPlans")]
        [HttpGet]
        public JsonResult GetPlans()
        {
            int userID = 1;
            var blos = this.planService.GetPlans(userID, true);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------

        // HealthStatusEntries-------------------------------------------------------------------------------------------------
        [Route("HomePage/AddHealthStatusEntry")]
        [HttpPost]
        public JsonResult AddHealthStatusEntry([FromBody]HealthStatusEntry blo)
        {
            int userID = 1;
            var bloWithUpdatedID = this.healthStatusEntryService.AddHealthStatusEntry(blo, userID);
            return Json(bloWithUpdatedID);
        }

        [Route("HomePage/GetHealthStatusEntries")]
        [HttpPost]
        public JsonResult GetHealthStatusEntries([FromBody] DateRangeModel model)
        {
            int userID = 1;
            var blos = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, userID, true);
            return Json(blos);
        }
        //---------------------------------------------------------------------------------------------------------------------


        // Models
        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }

    }
}

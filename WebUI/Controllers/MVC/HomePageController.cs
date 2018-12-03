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
using MedicalApp.WebUI.Code.WebSecurity.Implementation;
using BLL.DomainModel.Factors.Medicine.BLOs;
using System.Threading;

namespace WebUI.Controllers
{
    [Authorize]
    public class HomePageController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineTypeSupplyService medicineTypeSupplyService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }


        // Constructor
        public HomePageController(
            ISymptomTypeService symptomTypeService,
            IMedicineTypeService medicineTypeService,
            IMedicineTypeSupplyService medicineTypeSupplyService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService,
            WebSecurityManager webSecurityManager
            )
        {

            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineTypeSupplyService = medicineTypeSupplyService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;
            this.webSecurityManager = webSecurityManager;
        }

        // MVC methods
        public IActionResult Index()
        {
            try
            {
                if (this.webSecurityManager.GetCurrentUser() == null)
                {
                    // special "hack" when switching between local and azure as authentication cookie gets stuck
                    this.webSecurityManager.LogOut();
                }
                else
                {
                    // Update the LastLogInDate for the user account 
                    this.webSecurityManager.RefreshLastLoginDate();
                }
            }
            catch
            {
                this.webSecurityManager.LogOut();
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
        [HttpPost]
        public JsonResult GetInitialData([FromBody] DateRangeModel model)
        {
            // Get blos for initial bundle------------------------------------------------------------------------------------------------
            var loggedInUser = this.webSecurityManager.GetCurrentUser();
            var symptomTypes = symptomTypeService.GetSymptomTypes(loggedInUser.ID);
            var medicineTypes = medicineTypeService.GetAllMedicineTypes(loggedInUser.ID, true);
            var plans = planService.GetPlans(loggedInUser.ID, true);
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(model.DateRange, loggedInUser.ID);
            var healthStatusEntries = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, loggedInUser.ID, true);
            var userHasAnyHealthStatusEntries = this.healthStatusEntryService.GetUserHasAnyHealthStatusEntries(loggedInUser.ID);
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUser,
                SymptomTypes = symptomTypes,
                MedicineTypes = medicineTypes,
                Plans = plans,
                FactorRecordsForInitialRange = factorRecords,
                HealthStatusEntriesForInitialRange = new HealthStatusEntriesModel()
                {
                    HealthStatusEntries = healthStatusEntries,
                    UserHasAnyHealthStatusEntries = userHasAnyHealthStatusEntries
                }
            };

            return Json(bundle);
        }


        // FactorRecords-------------------------------------------------------------------------------------------------------
        [Route("HomePage/MarkFactorRecordsAsTaken")]
        [HttpPost]
        public JsonResult MarkFactorRecordsAsTaken([FromBody] MarkFactorRecordsAsTakenModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;

            this.medicineFactorRecordService.MarkFactorRecordsAsTaken(model.FactorRecordCompositeIDs, model.NewTakenStatuses, (int)userID);
            return Json(true);
        }

        [Route("HomePage/GetFactorRecords")]
        [HttpPost]
        public JsonResult GetFactorRecords([FromBody] DateRangeModel model)
        {
            var currentUser = this.webSecurityManager.GetCurrentUser();
            int? userID = currentUser.ID;
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

        [Route("HomePage/RenamePlan")]
        [HttpPost]
        public JsonResult RenamePlan([FromBody]RenamePlanModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            this.planService.RenamePlan(model.PlanID, model.NewName, (int)userID);
            return Json(null);
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

        // HealthStatusEntries & Symptoms -------------------------------------------------------------------------------------
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
            var userHasAnyHealthStatusEntries = this.healthStatusEntryService.GetUserHasAnyHealthStatusEntries((int)userID);


            var returnModel = new HealthStatusEntriesModel()
            {
                HealthStatusEntries = blos,
                UserHasAnyHealthStatusEntries = userHasAnyHealthStatusEntries
            };

            return Json(returnModel);
        }
        [Route("HomePage/GetRecentSymptoms")]
        [HttpPost]
        public JsonResult GetRecentSymptoms()
        {
            int? userID = this.webSecurityManager.CurrentUserID;

            // Prepare the range (select 7 days into the past)
            var now = Common.Functions.GetCurrentDateTimeInUTC();
            var last7DaysRange = new Range<DateTime>(now.Subtract(new TimeSpan(7, 0, 0, 0)), now);

            // Get the unique symptoms present in the above range
            var healthStatusEntries = this.healthStatusEntryService.GetHealthStatusEntries(last7DaysRange, (int)userID, true);
            var recentSymptoms = this.symptomTypeService.GetUniqueSymptomTypesInHealthEntries(healthStatusEntries);

            // Limit the return to only last 5
            return Json(recentSymptoms.Take(5));
        }
        [Route("HomePage/AddCustomSymptomType")]
        [HttpPost]
        public JsonResult AddCustomSymptomType([FromBody]SymptomType blo)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var bloWithUpdatedID = this.symptomTypeService.AddCustomSymptomType(blo, (int)userID);
            return Json(bloWithUpdatedID);
        }
        [Route("HomePage/IsSymptomTypeNameTaken")]
        [HttpPost]
        public JsonResult IsSymptomTypeNameTaken([FromBody] IsSymptomTypeNameTakenModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            bool isTaken = this.symptomTypeService.SymptomTypeNameExists((int)userID, model.Name, model.IgnoreName);

            return Json(isTaken);
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
        [Route("HomePage/GetMedicineTypes")]
        [HttpPost]
        public JsonResult GetMedicineTypes()
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.medicineTypeService.GetAllMedicineTypes((int)userID, true);
            return Json(blos);
        }
        [Route("HomePage/IsMedicineTypeNameTaken")]
        [HttpPost]
        public JsonResult IsMedicineTypeNameTaken([FromBody] IsMedicineTypeNameTakenModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            bool isTaken = this.medicineTypeService.MedicineTypeNameExists((int)userID, model.Name, model.IgnoreName);
            return Json(isTaken);
        }
        [Route("HomePage/RenameMedicineType")]
        [HttpPost]
        public JsonResult RenameMedicineType([FromBody]RenameMedicineTypeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            this.medicineTypeService.RenameMedicineType(model.MedicineTypeID, model.NewName, (int)userID);
            return Json(null);
        }
        //---------------------------------------------------------------------------------------------------------------------


        // MedicineTypes Supply -----------------------------------------------------------------------------------------------
        [Route("HomePage/AddMedicineTypeSupplyEntry")]
        [HttpPost]
        public JsonResult AddMedicineTypeSupplyEntry([FromBody]AddMedicineTypeSupplyEntryModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            this.medicineTypeSupplyService.AddMedicineTypeSupplyEntry((int)userID, model.MedicineTypeID, model.SupplyQuantity);


            return Json(null);
        }
        [Route("HomePage/ClearSupplyEntries")]
        [HttpPost]
        public JsonResult ClearSupplyEntries([FromBody]MedicineTypeIDModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            this.medicineTypeSupplyService.ClearSupplyEntries((int)userID, model.MedicineTypeID);
            return Json(null);
        }
        [Route("HomePage/RecalculateRemainingSupplyAmount")]
        [HttpPost]
        public JsonResult RecalculateRemainingSupplyAmount([FromBody]MedicineTypeIDModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;

            var supplyInfo = this.medicineTypeSupplyService.GetCurrentSupplyInfo((int)userID, model.MedicineTypeID);

            return Json(supplyInfo);
        }
        //---------------------------------------------------------------------------------------------------------------------


        // UserAccount---------------------------------------------------------------------------------------------------------
        [Route("HomePage/UpdatePassword")]
        [HttpPost]
        public JsonResult UpdatePassword([FromBody]UpdatePasswordModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            this.webSecurityManager.UpdatePassword(model.NewPassword);
            return Json(null);
        }
        //---------------------------------------------------------------------------------------------------------------------


        // Models - sent to BE
        public class AddMedicineTypeSupplyEntryModel
        {
            public int MedicineTypeID;
            public int SupplyQuantity;
        }
        public class MedicineTypeIDModel
        {
            public int MedicineTypeID;
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
        public class IsMedicineTypeNameTakenModel
        {
            public string Name { get; set; }
            public string IgnoreName { get; set; }
        }
        public class UpdatePasswordModel
        {
            public string NewPassword;
        }
        public class RenamePlanModel
        {
            public int PlanID;
            public string NewName;
        }
        public class RenameMedicineTypeModel
        {
            public int MedicineTypeID;
            public string NewName;
        }
        public class IsSymptomTypeNameTakenModel
        {
            public string Name { get; set; }
            public string IgnoreName { get; set; }
        }

        // Models - returned from BE
        public class HealthStatusEntriesModel
        {
            public List<HealthStatusEntry> HealthStatusEntries;
            public bool UserHasAnyHealthStatusEntries;
        }
        public class MedicineTypeSupplyInfoModel
        {
            public int? CurrentSupplyAmount { get; set; }
            public DateTime? SupplyWillLastUntil { get; set; }
        }
    }
}

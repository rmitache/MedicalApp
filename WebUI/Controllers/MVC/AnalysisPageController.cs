using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using Microsoft.AspNetCore.Mvc;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Plans.Services;
using Common.DataStructures;
using BLL.DomainModel.Indicators.Symptoms.Services;
using Common;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using MedicalApp.WebUI.Code.WebSecurity.Implementation;

namespace WebUI.Controllers
{
    [Authorize]
    public class AnalysisPageController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }



        // Constructor
        public AnalysisPageController(
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
            return View();
        }
        public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }



        // Startup
        [Route("AnalysisPage/GetInitialData")]
        [HttpPost]
        public JsonResult GetInitialData([FromBody] DateRangeModel model)
        {
            // Get blos for initial bundle------------------------------------------------------------------------------------------------

            var loggedInUser = this.webSecurityManager.GetCurrentUser();
            var symptomTypes = symptomTypeService.GetAllSymptomTypes();
            var medicineTypes = medicineTypeService.GetAllMedicineTypes(loggedInUser.ID);
            var plans = planService.GetPlans(loggedInUser.ID, true);
            var healthStatusEntries = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, loggedInUser.ID, true);
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUser,
                SymptomTypes = symptomTypes,
                MedicineTypes = medicineTypes,
                Plans = plans,
                HealthStatusEntriesForInitialRange = healthStatusEntries
            };

            return Json(bundle);
        }

        [Route("AnalysisPage/GetHealthStatusEntries")]
        [HttpPost]
        public JsonResult GetHealthStatusEntries([FromBody] DateRangeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, (int)userID, true);
            return Json(blos);
        }


        // UserAccount---------------------------------------------------------------------------------------------------------
        [Route("AnalysisPage/UpdatePassword")]
        [HttpPost]
        public JsonResult UpdatePassword([FromBody]UpdatePasswordModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            //var bloWithUpdatedID = this.medicineTypeService.AddMedicineType(blo, (int)userID);
            return Json(null);
        }
        //---------------------------------------------------------------------------------------------------------------------


        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }
        public class UpdatePasswordModel
        {
            public string NewPassword;
        }

    }
}

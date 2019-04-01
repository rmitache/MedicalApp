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
using BLL.DomainModel.Users.Services;

namespace WebUI.Controllers
{
    [AllowAnonymous]
    public class ExternalHistoryPageController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private IUserAccountService userAccountService { get; set; }



        // Constructor
        public ExternalHistoryPageController(
            ISymptomTypeService symptomTypeService,
            IMedicineTypeService medicineTypeService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService,
            IUserAccountService userAccountService
            )
        {

            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;
            this.userAccountService = userAccountService;
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
        [Route("ExternalHistoryPage/GetInitialData")]
        [HttpPost]
        public JsonResult GetInitialData([FromBody] DateRangeModel model)
        {
            // Get blos for initial bundle------------------------------------------------------------------------------------------------

            var loggedInUser = this.userAccountService.GetUserAccount(1);

            var symptomTypes = symptomTypeService.GetSymptomTypesInUse(loggedInUser.ID);
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

        [Route("ExternalHistoryPage/GetHealthStatusEntries")]
        [HttpPost]
        public JsonResult GetHealthStatusEntries([FromBody] DateRangeModel model)
        {
            int? userID = 1;
            var blos = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, (int)userID, true);
            return Json(blos);
        }



        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }
        

    }
}

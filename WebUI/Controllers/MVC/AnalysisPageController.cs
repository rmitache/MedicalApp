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
using Infare.FE4.WebUI.Code.WebSecurity.Implementation;

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


        // Private methods
        private Range<DateTime> GetMonthRangeWithPadding(DateTime refStartDate, DateTime refEndDate, int padding)
        {
            if (padding < 0)
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
        [HttpGet]
        public JsonResult GetInitialData()
        {

            // Get blos for initial bundle------------------------------------------------------------------------------------------------
            int factorsViewAvailableWindowPaddingInMonths = 0;
            int indicatorsViewAvailableWindowPaddingInMonths = 0;
            var refDate = DateTime.Now.Date;
            var initialFactorsViewDateRange = this.GetMonthRangeWithPadding(refDate, refDate, factorsViewAvailableWindowPaddingInMonths);
            var initialIndicatorsViewRange = this.GetMonthRangeWithPadding(refDate, refDate, indicatorsViewAvailableWindowPaddingInMonths);



            var loggedInUser = this.webSecurityManager.GetCurrentUser();
            var symptomTypes = symptomTypeService.GetAllSymptomTypes();
            var medicineTypes = medicineTypeService.GetAllMedicineTypes();
            var plans = planService.GetPlans(loggedInUser.ID, true);
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(initialFactorsViewDateRange, loggedInUser.ID);
            var healthStatusEntries = this.healthStatusEntryService.GetHealthStatusEntries(initialIndicatorsViewRange, loggedInUser.ID, true);
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

        [Route("AnalysisPage/GetHealthStatusEntries")]
        [HttpPost]
        public JsonResult GetHealthStatusEntries([FromBody] DateRangeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, (int)userID, true);
            return Json(blos);
        }

        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }

    }
}

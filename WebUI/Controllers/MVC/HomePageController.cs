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

namespace WebUI.Controllers
{

    public class HomePageController : Controller
    {
        // Fields 
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }

        // Constructor
        public HomePageController(
            IMedicineTypeService medicineTypeService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService
            )
        {
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



        // WebAPI methods
        [Route("HomePage/GetInitialData")]
        [HttpGet]
        public JsonResult GetInitialData()
        {

            // Get blos for initial bundle------------------------------------------------------------------------------------------------
            var loggedInUserJSON = new
            {
                ID = 1,
                Email = "john.doe@rocketmail.com",
                SignupDate = new DateTime(2017, 12, 28),
                BirthDate = new DateTime(1980, 10, 15),
                Language = "en"

            };
            var medicineTypes = medicineTypeService.GetAllMedicineTypes();
            var plans = planService.GetPlans(1, true);
            var initialScheduleRange = new Range<DateTime>(
                    DateTime.Today.Subtract(new TimeSpan(25, 0, 0, 0)),
                    DateTime.Today.Add(new TimeSpan(25, 23, 59, 59))
                );
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(initialScheduleRange, 1);
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUserJSON,
                MedicineTypes = medicineTypes,
                Plans = plans,
                FactorRecordsForInitialRange = factorRecords,

            };
            return Json(bundle);
        }

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
        public JsonResult GetFactorRecords([FromBody] GetFactorRecordsModel model)
        {
            int userID = 1;
            var blos = this.medicineFactorRecordService.GetMedicineFactorRecords(model.DateRange, userID);
            return Json(blos);
        }

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

        [Route("HomePage/AddHealthStatusEntry")]
        [HttpPost]
        public JsonResult AddHealthStatusEntry([FromBody]HealthStatusEntry blo)
        {
            int userID = 1;
            var bloWithUpdatedID = this.healthStatusEntryService.AddHealthStatusEntry(blo, userID);
            return Json(bloWithUpdatedID);
        }


        // Models
        public class GetFactorRecordsModel
        {
            public Range<DateTime> DateRange;

        }

    }
}

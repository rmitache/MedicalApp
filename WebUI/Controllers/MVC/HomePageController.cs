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

namespace WebUI.Controllers
{

    public class HomePageController : Controller
    {
        // Fields 
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }

        // Constructor
        public HomePageController(
            IMedicineTypeService medicineTypeService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService
            )
        {
            this.medicineTypeService = medicineTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
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
        public JsonResult Get()
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
            var shallowPlans = planService.GetPlans(1, false);
            var initialScheduleRange = new Range<DateTime>(
                    DateTime.Today.Subtract(new TimeSpan(30,0,0,0)),
                    DateTime.Today.AddDays(30)
                );
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(initialScheduleRange, 1);
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUserJSON,
                MedicineTypes = medicineTypes,
                Plans = shallowPlans,
                FactorRecordsForInitialRange = factorRecords,
                
            };
            return Json(bundle);
        }

        [Route("HomePage/AddFactorRecords")]
        [HttpPost]
        public JsonResult Post([FromBody]List<MedicineFactorRecord> factorRecords)
        {
            int userID = 1;
            var factorRecordsUpdatedIDs = this.medicineFactorRecordService.AddMedicineFactorRecords(factorRecords, userID);
            return Json(factorRecordsUpdatedIDs);
        }

        [Route("HomePage/GetFactorRecords")]
        [HttpPost]
        public JsonResult Post([FromBody] GetFactorRecordsModel model)
        {
            int userID = 1;
            var blos = this.medicineFactorRecordService.GetMedicineFactorRecords(model.DateRange, userID);
            return Json(blos);
        }

        [Route("HomePage/AddPlan")]
        [HttpPost]
        public JsonResult Post([FromBody]Plan plan)
        {
            int userID = 1;
            var planWithUpdatedID = this.planService.AddPlan(plan, userID);
            return Json(planWithUpdatedID);
        }
        [Route("HomePage/GetPlans_Shallow")]
        [HttpGet]
        public JsonResult GetPlans_Shallow()
        {
            int userID = 1;
            var blos = this.planService.GetPlans(userID, false);
            return Json(blos);
        }


        // Models
        public class GetFactorRecordsModel
        {
            public Range<DateTime> DateRange;

        }

    }
}

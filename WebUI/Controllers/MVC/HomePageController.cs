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

namespace WebUI.Controllers
{

    public class HomePageController : Controller
    {
        // Fields 
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }

        // Constructor
        public HomePageController(
            IMedicineTypeService medicineTypeService,
            IMedicineFactorRecordService medicineFactorRecordService
            )
        {
            this.medicineTypeService = medicineTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
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
            var medicineTypes = medicineTypeService.GetAllMedicineTypes();
            var factorRecords = medicineFactorRecordService.GetMedicineFactorRecords(DateTime.Now, 1);
            var loggedInUserJSON = new
            {
                ID = 1,
                Email = "john.doe@rocketmail.com",
                SignupDate = new DateTime(2017, 12, 28),
                BirthDate = new DateTime(1980, 10, 15),
                Language = "en"
                
            };
            //----------------------------------------------------------------------------------------------------------------------------


            // Return the bundle
            var bundle = new
            {
                LoggedInUser = loggedInUserJSON,
                MedicineTypes = medicineTypes,
                FactorRecordsForToday = factorRecords
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
        [HttpGet]
        public JsonResult Get([FromBody]DateTime date)
        {
            int userID = 1;
            var blos = this.medicineFactorRecordService.GetMedicineFactorRecords(DateTime.Now, userID);
            return Json(blos);
        }


    }
}

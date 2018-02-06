using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WebUI.Controllers
{

    public class HomePageController : Controller
    {
        // Fields 
        private IMedicineTypeService medicineTypeService { get; set; }

        // Constructor
        public HomePageController(IMedicineTypeService medicineTypeService)
        {
            this.medicineTypeService = medicineTypeService;
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
            List<MedicineType> medicineTypes = medicineTypeService.GetAllMedicineTypes();
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
                MedicineTypes = medicineTypes
            };
            return Json(bundle);
        }
        [Route("HomePage/AddFactorRecords")]
        [HttpPost]
        public HttpResponseMessage Post([FromBody]MedicineFactorRecord[] factorRecords)
        {
            //return Request.CreateResponse(HttpStatusCode.OK, null);
            return null;
        }



        // Models
        public class AddFactorRecordsModel
        {
            public MedicineFactorRecord factorRecord { get; set; }
        }
        //[HttpPost]
        //public HttpResponseMessage UpdateFilterSetting(BLO.FilterSetting filterSetting)
        //{
        //    BLO.FilterSetting updatedFilterSetting = _filterSettingsApi.Update(filterSetting);
        //    return Request.CreateResponse(HttpStatusCode.OK, updatedFilterSetting);
        //}
        //[HttpPost]
        //public HttpResponseMessage DeleteFilterSetting([FromBody] int id)
        //{
        //    _filterSettingsApi.DeleteByID(id);
        //    return Request.CreateResponse(HttpStatusCode.OK, "Completed");
        //}
    }
}

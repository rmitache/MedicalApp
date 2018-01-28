using System;
using System.Diagnostics;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using DataAccessLayer.Repositories.MedicineTypesRepository;
using Microsoft.AspNetCore.Mvc;

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
            var medicineTypes = this.medicineTypeService.GetAllMedicineTypes();
            // Generate mock json objects for initial data BUNDLE///////////////////////////////////////////////////////
            var LoggedInUserJSON = new
            {
                ID = 1,
                Email = "john.doe@rocketmail.com",
                SignupDate = new DateTime(2017, 12, 28),
                BirthDate = new DateTime(1980, 10, 15),
                Language = "en"
            };
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////




            // Return the bundle
            var bundle = new
            {
                LoggedInUser = LoggedInUserJSON
            };
            return Json(bundle);
        }
    }
}

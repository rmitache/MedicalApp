using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using DAL.Repositories.MedicineTypesRepository;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{

    public class HomePageController : Controller
    {
        // Fields 
        private IMedicineTypeRepository medicineTypeRepo { get; set; }

        // Constructor
        public HomePageController(IMedicineTypeRepository medicineTypeRepo)
        {
            this.medicineTypeRepo = medicineTypeRepo;
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

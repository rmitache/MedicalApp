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
using System.Threading.Tasks;

namespace WebUI.Controllers
{
    [AllowAnonymous]
    public class LoginPageController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }


        // Constructor
        public LoginPageController()
        {


        }

        // MVC methods
        public IActionResult Index()
        {
            return View();
        }

        [Route("LoginPage/Login")]
        [HttpPost]
        public async Task<JsonResult> Login([FromBody]LogInUserModel model)
        {
            bool loginSuccessful = false;
            if (model.Email == "user@gmail.com" && model.Password == "password")
            {
                loginSuccessful = true;
            }


            return Json(loginSuccessful);
        }

        // Models
        public class LogInUserModel
        {
            public string Email { get; set; }
            public string Password { get; set; }
            public bool KeepLoggedIn { get; set; }
        }

    }
}

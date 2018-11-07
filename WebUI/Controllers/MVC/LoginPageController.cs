
using Microsoft.AspNetCore.Mvc;
using BLL.DomainModel.Indicators.Symptoms.Services;
using Microsoft.AspNetCore.Authorization;
using System.Threading.Tasks;
using MedicalApp.WebUI.Code.WebSecurity.Implementation;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using BLL.DomainModel.Users.BLOs;

namespace WebUI.Controllers
{
    [AllowAnonymous]
    public class LoginPageController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }

        // Constructor
        public LoginPageController(WebSecurityManager webSecurityManager)
        {
            this.webSecurityManager = webSecurityManager;

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
            //// Find the UserAccount matching the credentials
            //var user = webSecurityManager.GetUserAccount(model.Email, model.Password);

            // If it has accepted the terms and conditions
            // Login
            // Else 



            var user = await webSecurityManager.LoginUser(model.Email, model.Password, model.KeepLoggedIn);
            
            return Json(user);
        }
        [Route("LoginPage/Logout")]
        [HttpPost]
        public async Task<JsonResult> Logout()
        {
            await webSecurityManager.LogOut();

            return Json(true);
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

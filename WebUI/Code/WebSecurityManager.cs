using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using Microsoft.AspNetCore.Http;
using BLL.DomainModel.Users.BLOs;
using BLL.DomainModel.Users.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
using Common;

namespace MedicalApp.WebUI.Code.WebSecurity.Implementation
{
    public class WebSecurityManager
    {
        // Fields
        private IHttpContextAccessor httpContextAccessor;
        private IUserAccountService userAccountService;

        // Properties
        public UserAccount GetCurrentUser()
        {
            // Get the email
            string email = CurrentUserEmail;


            // Get the User from the Session or from the API
            UserAccount user = userAccountService.FindUserAccount(email);
            return user;
        }
        public string CurrentUserEmail
        {
            get
            {
                ClaimsIdentity claimsIdentity = httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (!claimsIdentity.IsAuthenticated)
                    return null;

                return claimsIdentity.GetUserName();
            }
        }
        public int? CurrentUserID
        {
            get
            {
                ClaimsIdentity claimsIdentity = httpContextAccessor.HttpContext.User.Identity as ClaimsIdentity;
                if (!claimsIdentity.IsAuthenticated)
                    return null;

                return int.Parse(claimsIdentity.GetUserId());
            }
        }

        // Private methods
        private ClaimsPrincipal CreateUserIdentity(UserAccount user)
        {
            // Setup standard claims
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.Email));

            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);

            return new ClaimsPrincipal(identity);
        }


        // Constructor
        public WebSecurityManager(IHttpContextAccessor httpContextAccessor,
            IUserAccountService userAccountService)
        {
            this.httpContextAccessor = httpContextAccessor;
            this.userAccountService = userAccountService;
        }

        // Public methods
        public async Task<LoginResult> LoginUser(string email, string clearTextPassword, bool keepLoggedIn)
        {
            // Attempt to find a user which matches the credentials
            var user = userAccountService.FindUserAccount(email, clearTextPassword);
            var loginResult = new LoginResult();
            loginResult.User = user;

            // If a user matching the credentials was found, which also has accepted the terms
            if (user != null && user.TermsAcceptedDate != null)
            {
                var identity = CreateUserIdentity(user);
                await httpContextAccessor.HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    identity,
                    new AuthenticationProperties()
                    {
                        AllowRefresh = true,
                        IsPersistent = keepLoggedIn,
                        ExpiresUtc = DateTime.UtcNow.AddDays(7)
                    });

                loginResult.LoginResultStatus = LoginResultStatus.Success;
            }
            // If there is a user, but he hasnt accepted the terms
            else if (user != null && user.TermsAcceptedDate == null)
            {
                loginResult.LoginResultStatus = LoginResultStatus.Failure_TermsNotAccepted;
            }
            // If no user was found, or credentials were wrong
            else
            {
                loginResult.LoginResultStatus = LoginResultStatus.Failure_CredentialsWrongOrUserNotFound;
            }

            return loginResult;
        }
        public UserAccount GetUserAccount(string email, string clearTextPassword)
        {
            var user = userAccountService.FindUserAccount(email, clearTextPassword);

            return user;
        }
        public async Task LogOut()
        {
            await httpContextAccessor.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        }
        public void UpdatePassword(string newPassword)
        {
            this.userAccountService.UpdatePassword((int)this.CurrentUserID, newPassword);
        }
        public void UpdateAcceptedTermsDate(int userID, DateTime dateTime)
        {
            this.userAccountService.UpdateAcceptedTermsDate(userID, dateTime);
        }
        public void RefreshLastLoginDate()
        {
            if (this.CurrentUserID == null)
            {
                return;
            }

            this.userAccountService.UpdateLastLoginDate((int)this.CurrentUserID, Functions.GetCurrentDateTimeInUTC());
        }
    }

    public class LoginResult
    {
        public UserAccount User { get; set; }
        public LoginResultStatus LoginResultStatus { get; set; }
    }
    public enum LoginResultStatus
    {
        Success = 0,
        Failure_CredentialsWrongOrUserNotFound = 1,
        Failure_TermsNotAccepted = 2
    }
}
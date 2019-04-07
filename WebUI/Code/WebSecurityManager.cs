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
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

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
        public IConfiguration Configuration { get; }

        // Constructor
        public WebSecurityManager(
            IConfiguration configuration,
            IHttpContextAccessor httpContextAccessor,
            IUserAccountService userAccountService)
        {
            this.Configuration = configuration;
            this.httpContextAccessor = httpContextAccessor;
            this.userAccountService = userAccountService;
        }

        // Private methods 
        private async Task SignInUsingCookie(UserAccount user, bool keepLoggedIn)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, user.Email));
            var identity = new ClaimsPrincipal(new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie));

            await httpContextAccessor.HttpContext.SignInAsync(
                CookieAuthenticationDefaults.AuthenticationScheme,
                identity,
                new AuthenticationProperties()
                {
                    AllowRefresh = true,
                    IsPersistent = keepLoggedIn,
                    ExpiresUtc = DateTime.UtcNow.AddDays(7)
                });
        }
        private string SignInUsingToken(UserAccount user, bool keepLoggedIn)
        {
            var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.ID.ToString()),
                    new Claim(ClaimTypes.Name, user.Email)
                  //new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                  //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };
            var identity = new ClaimsPrincipal(new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie));

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var x = Configuration["Jwt:Issuer"];
            var token = new JwtSecurityToken(Configuration["Jwt:Issuer"],
              Configuration["Jwt:Issuer"],
              claims,
              expires: null,
              signingCredentials: creds);


            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return tokenString;
        }

        // Public methods
        public async Task<LoginResult> LoginUser(string email, string clearTextPassword, bool keepLoggedIn, AuthMethod authMethod = AuthMethod.Cookie)
        {
            // Attempt to find a user which matches the credentials
            var user = userAccountService.FindUserAccount(email, clearTextPassword);
            var loginResult = new LoginResult();
            loginResult.User = user;

            
            // 
            if (user != null && user.TermsAcceptedDate != null)
            {
                // User matching the credentials was found, which has accepted the terms
                switch(authMethod)
                {
                    case AuthMethod.Cookie:
                        await this.SignInUsingCookie(user, keepLoggedIn);
                        break;
                    case AuthMethod.JWT:
                        loginResult.Token = this.SignInUsingToken(user, keepLoggedIn);
                        break;
                }
                loginResult.LoginResultStatus = LoginResultStatus.Success;
            }
            else if (user != null && user.TermsAcceptedDate == null)
            {
                // User hasn't accepted the terms
                loginResult.LoginResultStatus = LoginResultStatus.Failure_TermsNotAccepted;
            }
            else
            {
                // No user was found, or credentials were wrong
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
        public void UpdateHasSeenWelcome(int userID, bool hasSeenWelcome)
        {
            this.userAccountService.UpdateHasSeenWelcome(userID, hasSeenWelcome);
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

    public enum AuthMethod
    {
        Cookie,
        JWT
    }
    public class LoginResult
    {
        public UserAccount User { get; set; }
        public LoginResultStatus LoginResultStatus { get; set; }
        public string Token { get; set; } = null;
    }
    public enum LoginResultStatus
    {
        Success = 0,
        Failure_CredentialsWrongOrUserNotFound = 1,
        Failure_TermsNotAccepted = 2
    }
}
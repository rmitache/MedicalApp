using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using BLL.DomainModel.Patients.BLOs;
using Microsoft.AspNetCore.Http;

namespace Infare.FE4.WebUI.Code.WebSecurity.Implementation
{
    public class WebSecurityProvider
    {

        // Private methods
        private ClaimsIdentity CreateUserIdentity(UserAccount user)
        {
            //// Setup standard claims
            //var claims = new List<Claim>();
            //claims.Add(new Claim(ClaimTypes.NameIdentifier, user..ToString()));
            //claims.Add(new Claim(ClaimTypes.Name, user.Email));

            //var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);
            //return identity;
            return null;
        }

        
        //// IWebSecurity implementation 
        //public User GetCurrentUser()
        //{
        //    // Get the email
        //    string email = CurrentUserEmail;
        //    if (email == null)
        //    {
        //        return User.UnknownUser;
        //    }

        //    // Get the User from the Session or from the API
        //    User user = _securityAPI.FindUser(email);
        //    return user;
        //}

        //public string CurrentUserEmail
        //{
        //    get
        //    {
        //        ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
        //        if (!claimsIdentity.IsAuthenticated)
        //            return null;

        //        return claimsIdentity.GetUserName();
        //    }
        //}


        public bool LogInUser(string email, string clearTextPassword, bool rememberMe)
        {
            //bool userLoginResult = false;

            //// Attempt to find a user which matches the credentials
            //var user = _securityAPI.FindUserByCredentials(email, clearTextPassword);

            //// Sign in the user
            //if (user != null)
            //{
            //    var identity = CreateUserIdentity(user);
            //    _authenticationManager.SignIn(new AuthenticationProperties()
            //    {
            //        AllowRefresh = true,
            //        IsPersistent = rememberMe,
            //        ExpiresUtc = DateTime.UtcNow.AddDays(7)
            //    }, identity);

            //    userLoginResult = true;
            //}

            //return userLoginResult;
            return false;
        }

        public void LogOut()
        {
            //_authenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
        }
    }
}
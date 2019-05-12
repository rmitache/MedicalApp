using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Plans.Services;
using BLL.DomainModel.Plans.BLOs;
using Common.DataStructures;
using BLL.DomainModel.Indicators.Symptoms.Services;
using BLL.DomainModel.Indicators.Symptoms.BLOs;
using Common;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using MedicalApp.WebUI.Code.WebSecurity.Implementation;
using BLL.DomainModel.Factors.Medicine.BLOs;
using System.Threading;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using static WebUI.Controllers.HomePageController;

namespace WebUI.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MobileAPIController : Controller
    {
        // Fields        
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }


        // Constructor
        public MobileAPIController(
            WebSecurityManager webSecurityManager,
            IMedicineFactorRecordService medicineFactorRecordService,
            IHealthStatusEntryService healthStatusEntryService
            )
        {
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.webSecurityManager = webSecurityManager;
            this.healthStatusEntryService = healthStatusEntryService;
        }

        [Route("MobileAPI/GetFactorRecords")]
        [HttpPost]
        public JsonResult GetFactorRecords([FromBody] DateRangeModel model)
        {
            var currentUser = this.webSecurityManager.GetCurrentUser();
            int? userID = currentUser.ID;
            var blos = this.medicineFactorRecordService.GetMedicineFactorRecords(model.DateRange, (int)userID);
            return Json(blos);
        }

        [Route("MobileAPI/GetHealthStatusEntries")]
        [HttpPost]
        public JsonResult GetHealthStatusEntries([FromBody] DateRangeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var blos = this.healthStatusEntryService.GetHealthStatusEntries(model.DateRange, (int)userID, true);
            var userHasAnyHealthStatusEntries = this.healthStatusEntryService.GetUserHasAnyHealthStatusEntries((int)userID);


            var returnModel = new HealthStatusEntriesModel()
            {
                HealthStatusEntries = blos,
                UserHasAnyHealthStatusEntries = userHasAnyHealthStatusEntries
            };

            return Json(returnModel);
        }


        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }

    }
}

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
        private ISymptomTypeService symptomTypeService { get; set; }

        private WebSecurityManager webSecurityManager { get; set; }


        // Constructor
        public MobileAPIController(
            WebSecurityManager webSecurityManager,
            IMedicineFactorRecordService medicineFactorRecordService,
            IHealthStatusEntryService healthStatusEntryService,
            ISymptomTypeService symptomTypeService
            )
        {
            this.symptomTypeService = symptomTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.webSecurityManager = webSecurityManager;
            this.healthStatusEntryService = healthStatusEntryService;
        }


        // HealthStatuses
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
        [Route("MobileAPI/AddHealthStatusEntry")]
        [HttpPost]
        public JsonResult AddHealthStatusEntry([FromBody]HealthStatusEntry blo)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var bloWithUpdatedID = this.healthStatusEntryService.AddHealthStatusEntry(blo, (int)userID);
            return Json(bloWithUpdatedID);
        }



        // Symptoms
        [Route("MobileAPI/GetAllSymptomTypes")]
        [HttpPost]
        public JsonResult GetAllSymptomTypes()
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var symptomTypes = symptomTypeService.GetSymptomTypes((int)userID);

            return Json(symptomTypes);
        }
        [Route("MobileAPI/AddCustomSymptomType")]
        [HttpPost]
        public JsonResult AddCustomSymptomType([FromBody]SymptomType blo)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            var bloWithUpdatedID = this.symptomTypeService.AddCustomSymptomType(blo, (int)userID);
            return Json(bloWithUpdatedID);
        }
        [Route("MobileAPI/RenameCustomSymptomType")]
        [HttpPost]
        public JsonResult RenameCustomSymptomType([FromBody]RenameSymptomTypeModel model)
        {
            int? userID = this.webSecurityManager.CurrentUserID;
            this.symptomTypeService.RenameCustomSymptomType( model.SymptomTypeID, model.NewName, (int)userID);
            return Json(null);
        }

        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }

    }
}

public class RenameSymptomTypeModel
{
    public int SymptomTypeID;
    public string NewName;
}
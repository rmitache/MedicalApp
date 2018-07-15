using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using Microsoft.AspNetCore.Mvc;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Plans.Services;
using Common.Datastructures;
using BLL.DomainModel.Indicators.Symptoms.Services;
using Common;
using BLL.DomainModel.Indicators.Symptoms.Services;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Infare.FE4.WebUI.Code.WebSecurity.Implementation;

namespace WebUI.Controllers
{
    [Authorize]
    public class MobileAPIController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }



        // Constructor
        public MobileAPIController(
            ISymptomTypeService symptomTypeService,
            IMedicineTypeService medicineTypeService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService,
            WebSecurityManager webSecurityManager
            )
        {

            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;
            this.webSecurityManager = webSecurityManager;
        }



        public class DateRangeModel
        {
            public Range<DateTime> DateRange;
        }

    }
}

using System;
using System.Diagnostics;
using System.Net;
using System.Net.Http;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using Microsoft.AspNetCore.Mvc;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Plans.Services;
using Common.DataStructures;
using BLL.DomainModel.Indicators.Symptoms.Services;
using Common;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using MedicalApp.WebUI.Code.WebSecurity.Implementation;

namespace WebUI.Controllers
{
    [Authorize]
    public class CommonAPIController : Controller
    {
        // Fields 
        private ISymptomTypeService symptomTypeService { get; set; }
        private IMedicineTypeService medicineTypeService { get; set; }
        private IMedicineTypeSupplyService medicineTypeSupplyService { get; set; }
        private IMedicineFactorRecordService medicineFactorRecordService { get; set; }
        private IPlanService planService { get; set; }
        private IHealthStatusEntryService healthStatusEntryService { get; set; }
        private WebSecurityManager webSecurityManager { get; set; }


        // Constructor
        public CommonAPIController(
            ISymptomTypeService symptomTypeService,
            IMedicineTypeService medicineTypeService,
            IMedicineTypeSupplyService medicineTypeSupplyService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService,
            WebSecurityManager webSecurityManager
            )
        {

            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineTypeSupplyService = medicineTypeSupplyService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;
            this.webSecurityManager = webSecurityManager;
        }

        // Methods
        [Route("CommonAPI/DownloadData")]
        [HttpGet]
        public FileResult DownloadData()
        {
            int? userID = this.webSecurityManager.CurrentUserID;

            // Get MedicineTypes
            return File($"~/files/test.txt", "application/text", "test.txt");

            //var blos = this.medicineTypeService.GetAllMedicineTypes((int)userID);
            //return Json(blos);
        }

    }
}

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
using System.IO;
using Microsoft.AspNetCore.Hosting;
using OfficeOpenXml;
using BLL.DomainModel.Factors.Medicine.BLOs;
using System.Text;
using System.Threading;

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
        private IHostingEnvironment _env;

        // Constructor
        public CommonAPIController(
            ISymptomTypeService symptomTypeService,
            IMedicineTypeService medicineTypeService,
            IMedicineTypeSupplyService medicineTypeSupplyService,
            IMedicineFactorRecordService medicineFactorRecordService,
            IPlanService planService,
            IHealthStatusEntryService healthStatusEntryService,
            WebSecurityManager webSecurityManager,
            IHostingEnvironment env
            )
        {

            this.symptomTypeService = symptomTypeService;
            this.medicineTypeService = medicineTypeService;
            this.medicineTypeSupplyService = medicineTypeSupplyService;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.planService = planService;
            this.healthStatusEntryService = healthStatusEntryService;
            this.webSecurityManager = webSecurityManager;

            this._env = env;
        }


        // Methods
        [Route("CommonAPI/DownloadData")]
        [HttpGet]
        public FileResult DownloadData()
        {
            // Variables
            int? userID = this.webSecurityManager.CurrentUserID;
            MemoryStream stream = new MemoryStream();
            StreamWriter writer = new StreamWriter(stream);

            // Create the excel file for download
            using (ExcelPackage package = new ExcelPackage(stream))
            {

                // 1. Health Status Entries ----------------------------------------------------------------------------
                var healthEntriesWorksheet = package.Workbook.Worksheets.Add("Health Entries");

                // Create headers
                healthEntriesWorksheet.Cells[1, 1].Value = "Date";
                healthEntriesWorksheet.Cells[1, 2].Value = "Time";
                healthEntriesWorksheet.Cells[1, 3].Value = "Status";
                healthEntriesWorksheet.Cells[1, 4].Value = "Symptoms";
                healthEntriesWorksheet.Cells[1, 5].Value = "Symptom Intensities";
                healthEntriesWorksheet.Cells[1, 1, 1, 5].Style.Font.Bold = true;




                healthEntriesWorksheet.Cells.AutoFitColumns();
                // 2. MedicineTypes-------------------------------------------------------------------------------------
                var medicineTypesWorksheet = package.Workbook.Worksheets.Add("Medicine Types");

                // Create headers
                medicineTypesWorksheet.Cells[1, 1].Value = "Name";
                medicineTypesWorksheet.Cells[1, 2].Value = "Producer";
                medicineTypesWorksheet.Cells[1, 1, 1, 2].Style.Font.Bold = true;

                // Create rows
                var medicineTypes = this.medicineTypeService.GetAllMedicineTypes((int)userID);
                for (int i = 0; i < medicineTypes.Count; i++)
                {
                    MedicineType medType = medicineTypes[i];
                    medicineTypesWorksheet.Cells[i + 2, 1].Value = medType.Name;
                    medicineTypesWorksheet.Cells[i + 2, 2].Value = medType.ProducerName;
                }
                medicineTypesWorksheet.Cells.AutoFitColumns();
                //------------------------------------------------------------------------------------------------------


                package.Save();
            }


            // Write to memory and return the file
            writer.Flush();
            stream.Position = 0;
            var file = File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "radu.xlsx");
            return file;

        }

    }
}
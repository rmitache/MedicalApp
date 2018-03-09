using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.History.Factories;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Plans.Services;
using Common.Datastructures;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public class MedicineFactorRecordService : IMedicineFactorRecordService
    {
        // Fields
        private readonly IMedicineFactorRecordRepository medicineFactorRecordRepo;
        private readonly IMedicineFactorRecordFactory medicineFactorRecordFactory;
        private readonly IMedicineTypeFactory medicineTypeFactory;
        private readonly IPlanService planService;

        // Constructor
        public MedicineFactorRecordService(
            IMedicineFactorRecordRepository medicineFactorRecordRepo,
            IMedicineFactorRecordFactory medicineFactorRecordFactory,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
            this.medicineFactorRecordRepo = medicineFactorRecordRepo;
            this.medicineFactorRecordFactory = medicineFactorRecordFactory;
            this.medicineTypeFactory = medicineTypeFactory;
            this.planService = planService;
        }

        // Public methods
        public List<MedicineFactorRecord> AddMedicineFactorRecords(List<MedicineFactorRecord> blos, int userID)
        {
            var dataEntities = this.medicineFactorRecordFactory.Convert_ToDataEntitiesList(blos, userID);
            this.medicineFactorRecordRepo.AddMedicineFactorRecords(dataEntities);


            // Update IDs on BLOs which will be returned
            for (int i = 0; i < dataEntities.Count; i++)
            {
                blos[i].ID = dataEntities[i].Id;
            }

            return blos;
        }
        public List<MedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID)
        {
            // FactorRecords of type UserEntry
            var userEntryDataEntities = this.medicineFactorRecordRepo.GetMedicineFactorRecords(dateRange, userID);
            var userEntryFactorRecordBLOs = this.medicineFactorRecordFactory.Convert_ToBLOList(userEntryDataEntities);

            // FactorRecords projected from the user's plans
            var plans = this.planService.GetPlans(userID, true);
            var planProjectionFactorRecordBLOs = this.medicineFactorRecordFactory.Create_FromMedicinePlans(plans, dateRange.RangeStart, dateRange.RangeEnd);

            // 
            var allFactorRecordBLOs = planProjectionFactorRecordBLOs.Concat(userEntryFactorRecordBLOs).OrderBy(rec => rec.OccurenceDateTime).ToList();
            return allFactorRecordBLOs;
        }


    }


}

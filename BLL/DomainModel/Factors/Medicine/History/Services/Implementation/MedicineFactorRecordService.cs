using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.History.Factories;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Plans.Services;
using Common.Datastructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public class MedicineFactorRecordService : IMedicineFactorRecordService
    {
        // Fields
        private readonly IMedicineFactorRecordRepository medicineFactorRecordRepo;
        private readonly ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo;
        private readonly IMedicineFactorRecordFactory medicineFactorRecordFactory;
        private readonly IMedicineTypeFactory medicineTypeFactory;
        private readonly IPlanService planService;

        // Private methods
        private string GetSpecialKey(MedicineFactorRecord record)
        {
            string key;
            if (record.ParentPlanID != null)
            {
                key = record.ParentPlanID + "_" + record.MedicineType.ID + "_" + record.OccurrenceDateTime.ToString();
            }
            else
            {
                key = record.ID + "";
            }

            return key;
        }

        // Constructor
        public MedicineFactorRecordService(
            IMedicineFactorRecordRepository medicineFactorRecordRepo,
            ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo,
            IMedicineFactorRecordFactory medicineFactorRecordFactory,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
            this.medicineFactorRecordRepo = medicineFactorRecordRepo;
            this.takenMedFactorRecordRepo = takenMedFactorRecordRepo;
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
        public void MarkFactorRecordsAsTaken(List<MedicineFactorRecord> blos, int userID)
        {
            // Collections
            var dataEntitiesToAdd = new List<TTakenMedicineFactorRecord>();
            var dataEntitiesToRemove = new List<TTakenMedicineFactorRecord>();

            // Loop through factorRecords and check out their Taken property
            foreach (MedicineFactorRecord record in blos)
            {
                // Create the dataEntity
                var newDataEntity = new TTakenMedicineFactorRecord();
                newDataEntity.MedicineTypeId = record.MedicineType.ID;
                newDataEntity.PlanId = (record.ParentPlanID != null) ? record.ParentPlanID : null;
                newDataEntity.MedicineFactorRecordId = (record.Type == MedicineFactorRecordType.UserEntry) ? record.ID as int? : null;
                newDataEntity.OccurrenceDateTime = record.OccurrenceDateTime;

                if (record.Taken == true)
                {
                    dataEntitiesToAdd.Add(newDataEntity);
                }
                else if (record.Taken == false)
                {
                    dataEntitiesToRemove.Add(newDataEntity);
                }

            }

            // Add and remove appropriately
            this.takenMedFactorRecordRepo.AddTakenMedicineFactorRecords(dataEntitiesToAdd);
            this.takenMedFactorRecordRepo.RemoveTakenMedicineFactorRecords(dataEntitiesToRemove);
        }
        public List<MedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID)
        {
            // Get User Entries records
            var userEntryDataEntities = this.medicineFactorRecordRepo.GetMedicineFactorRecords(dateRange, userID);
            var userEntryFactorRecordBLOs = this.medicineFactorRecordFactory.Convert_ToBLOList(userEntryDataEntities);

            // Get Plan Projected records
            var plans = this.planService.GetPlans(userID, true);
            var planProjectionFactorRecordBLOs = this.medicineFactorRecordFactory.Create_FromMedicinePlans(plans, dateRange.RangeStart, dateRange.RangeEnd);



            // Place all factorRecords together and then set their Taken property
            var allFactorRecordBLOs = planProjectionFactorRecordBLOs.Concat(userEntryFactorRecordBLOs).OrderBy(rec => rec.OccurrenceDateTime).ToList();
            var takenDataEntitiesDictionary = this.takenMedFactorRecordRepo.GetTakenMedicineFactorRecords(dateRange, userID);
            foreach(MedicineFactorRecord record in allFactorRecordBLOs)
            {
                var key = this.GetSpecialKey(record);
                if (takenDataEntitiesDictionary.ContainsKey(key))
                {
                    record.Taken = true;
                }

            }

            return allFactorRecordBLOs;
        }


    }


}

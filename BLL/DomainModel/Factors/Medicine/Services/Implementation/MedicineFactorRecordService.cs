using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
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
        private Dictionary<string, TTakenMedicineFactorRecord> ConvertListOfTakenDataEntitiesToDict(List<TTakenMedicineFactorRecord> list)
        {
            var dictionary = new Dictionary<string, TTakenMedicineFactorRecord>();
            foreach (TTakenMedicineFactorRecord dataEntity in list)
            {
                int medicineFactorRecordID = (dataEntity.MedicineFactorRecordId == null) ? -1 : (int)dataEntity.MedicineFactorRecordId;
                string key = MedicineFactorRecord.DetermineCompositeID(dataEntity.PlanId, medicineFactorRecordID, dataEntity.MedicineTypeId,
                    dataEntity.OccurrenceDateTime);
                dictionary[key] = dataEntity;
            }

            return dictionary;
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
        public void MarkFactorRecordsAsTaken(string[] compositeIDs, bool[] newTakenStatuses, int userID)
        {
            // Collections
            var dataEntitiesToAdd = new List<TTakenMedicineFactorRecord>();
            var dataEntitiesToRemove = new List<TTakenMedicineFactorRecord>();

            // Loop through compositeIDs and check out their Taken property
            for (int i = 0; i < compositeIDs.Length; i++)
            {
                var compositeID = compositeIDs[i];
                var newTakenStatus = newTakenStatuses[i];

                // Create the dataEntity
                var breakdown = MedicineFactorRecord.ExtractFromCompositeID(compositeID);
                var newDataEntity = new TTakenMedicineFactorRecord();
                newDataEntity.MedicineTypeId = breakdown.MedicineTypeID;
                newDataEntity.PlanId = breakdown.ParentPlanID;
                newDataEntity.MedicineFactorRecordId = (breakdown.MedicineFactorRecordID == -1) ? (int?)null : breakdown.MedicineFactorRecordID; 
                newDataEntity.OccurrenceDateTime = breakdown.OccurrenceDateTime;

                if (newTakenStatus == true)
                {
                    dataEntitiesToAdd.Add(newDataEntity);
                }
                else if (newTakenStatus == false)
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
            var takenDataEntitiesDictionary = this.ConvertListOfTakenDataEntitiesToDict(this.takenMedFactorRecordRepo.GetTakenMedicineFactorRecords(dateRange, userID));
            foreach (MedicineFactorRecord blo in allFactorRecordBLOs)
            {
                var key = MedicineFactorRecord.DetermineCompositeID(blo);
                if (takenDataEntitiesDictionary.ContainsKey(key))
                {
                    blo.Taken = true;
                }
            }

            return allFactorRecordBLOs;
        }


    }


}

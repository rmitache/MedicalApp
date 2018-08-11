using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Plans.Services;
using Common.DataStructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public class MedicineFactorRecordService : IMedicineFactorRecordService
    {
        // Fields
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
                string key = MedicineFactorRecord.DetermineCompositeID(dataEntity.PlanId, dataEntity.PlanMedicineRuleItemId,
                    dataEntity.MedicineTypeId, dataEntity.OccurrenceDateTime);
                dictionary[key] = dataEntity;
            }

            return dictionary;
        }
       

        // Constructor
        public MedicineFactorRecordService(
            ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo,
            IMedicineFactorRecordFactory medicineFactorRecordFactory,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
            this.takenMedFactorRecordRepo = takenMedFactorRecordRepo;
            this.medicineFactorRecordFactory = medicineFactorRecordFactory;
            this.medicineTypeFactory = medicineTypeFactory;
            this.planService = planService;
        }

        // Public methods
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
                var newDataEntity = new TTakenMedicineFactorRecord
                {
                    MedicineTypeId = breakdown.MedicineTypeID,
                    PlanMedicineRuleItemId = breakdown.MedicineRuleItemID,
                    PlanId = breakdown.ParentPlanID,
                    OccurrenceDateTime = breakdown.OccurrenceDateTime
                };

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
        public List<MedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int utcOffsetInMins, int userID)
        {
            // Get Plan Projected records
            var plans = this.planService.GetPlans(userID, true);
            var planProjectionFactorRecordBLOs = this.medicineFactorRecordFactory.Create_FromMedicinePlans(plans, 
                dateRange.RangeStart, dateRange.RangeEnd, utcOffsetInMins);

            // Sort factorRecords by their date and then set their Taken property
            var allFactorRecordBLOs = planProjectionFactorRecordBLOs.OrderBy(rec => rec.OccurrenceDateTime).ToList();
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

using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Services;
using Common;
using Common.DataStructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public class MedicineTypeService : IMedicineTypeService
    {
        // Fields
        private readonly ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo;
        private readonly IMedicineTypeRepository medicineTypeRepo;
        private readonly IMedicineTypeFactory medicineTypeFactory;
        private readonly IPlanService planService;

        // Private methods
        private Dictionary<string, MedicineType> GetUniqueMedicineTypesInUseByPlans(List<Plan> planBLOs, Range<DateTime> targetDateRange)
        {
            // Variables
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseAcrossPlans = new Dictionary<string, MedicineType>();

            // Get Versions in the plans which intersect with the targetDateRange
            foreach (Plan plan in planBLOs)
            {
                // For each Version loop through the unique MedicineTypes and merge them to the list 
                var versionsInPlanHittingToday = plan.GetVersionsWhichIntersectWithDateRange(targetDateRange);
                foreach (Plans.BLOs.Version version in versionsInPlanHittingToday)
                {
                    var uniqueMedTypesInVersion = version.GetUniqueMedicineTypes();
                    foreach (string medicineTypeName in uniqueMedTypesInVersion.Keys)
                    {
                        if (!uniqueMedicineTypesInUseAcrossPlans.ContainsKey(medicineTypeName))
                        {
                            uniqueMedicineTypesInUseAcrossPlans[medicineTypeName] = uniqueMedTypesInVersion[medicineTypeName];
                        }
                    }
                }
            }

            // 
            return uniqueMedicineTypesInUseAcrossPlans;
        }
        private int? DetermineMedicineTypeRemainingSupply(TMedicineType medTypeDataEntity)
        {
            // Determine the total supply amount
            int? totalSupplyAmount = null;
            if (medTypeDataEntity.TMedicineTypeSupplyEntry.Count > 0)
            {
                totalSupplyAmount = medTypeDataEntity.TMedicineTypeSupplyEntry
                    .Select(supplyEntry => supplyEntry.SupplyQuantity).Sum();
            }

            // Determine how much supply is left
            int? remainingSupplyAmount = null;
            if (totalSupplyAmount != null)
            {
                remainingSupplyAmount = totalSupplyAmount;
                var takenRecords = medTypeDataEntity.TTakenMedicineFactorRecord;
                foreach (TTakenMedicineFactorRecord takenRecord in takenRecords)
                {
                    if (medTypeDataEntity.IsPackagedIntoUnits)
                    {
                        // If it's packaged into units, subtract 1 unitdose for each Taken record
                        // Consider the amount to be measured in the UnitDoseSizeType 
                        remainingSupplyAmount -= takenRecord.PlanMedicineRuleItem.UnitDoseQuantifier;
                    }
                    else
                    {
                        // If it's not packaged into units, each RuleItem will have its own customDoseType
                        // In which case consider the amount to be measured in BaseUnitOfMeasure 
                        remainingSupplyAmount -= takenRecord.PlanMedicineRuleItem.UserDefinedUnitDoseSize * takenRecord.PlanMedicineRuleItem.UnitDoseQuantifier;

                    }

                    
                }
            }

            remainingSupplyAmount = (remainingSupplyAmount < 0) ? 0 : remainingSupplyAmount;
            return remainingSupplyAmount;

        }

        // Constructor
        public MedicineTypeService(
            ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo,
            IMedicineTypeRepository medicineTypeRepo,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
            this.takenMedFactorRecordRepo = takenMedFactorRecordRepo;
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineTypeFactory = medicineTypeFactory;
            this.planService = planService;
        }

        // Public methods
        public MedicineType AddMedicineType(MedicineType blo, int userID)
        {
            var dataEntity = this.medicineTypeFactory.Convert_ToDataEntity(blo, userID);
            this.medicineTypeRepo.AddMedicineType(dataEntity);

            blo.ID = dataEntity.Id;

            return blo;
        }
        public List<MedicineType> GetAllMedicineTypes(int userID, bool retreiveSupplyAndUsageInfo = false)
        {
            // Get all the medicineTypes available for the current user 
            var dataEntities = this.medicineTypeRepo.GetAllMedicineTypes(userID, true);

            // Get usage info for each MedicineType
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseToday = null;
            if (retreiveSupplyAndUsageInfo)
            {
                var planBLOs = this.planService.GetPlans(userID, true);
                var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
                Range<DateTime> today = new Range<DateTime>(currentDateTime, currentDateTime);
                uniqueMedicineTypesInUseToday = this.GetUniqueMedicineTypesInUseByPlans(planBLOs, today);
            }

            // Get supply info for each MedicineType
            Dictionary<string, int?> supplyQuantitiesLeftPerMedicineType = null;
            if (retreiveSupplyAndUsageInfo)
            {
                supplyQuantitiesLeftPerMedicineType = dataEntities.ToDictionary(entry => entry.Name, entry => this.DetermineMedicineTypeRemainingSupply(entry));
            }


            // Construct the BLOs
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities, uniqueMedicineTypesInUseToday, supplyQuantitiesLeftPerMedicineType);
            var sortedBLOs = blos.OrderBy(medicineType => medicineType.Name).ToList();


            return sortedBLOs;
        }
        public void AddMedicineTypeSupplyEntry(int userID, int medicineTypeID, int supplyQuantity)
        {
            // Get the dataEntity and its supplyEntries
            var medicineTypeDataEntity = this.medicineTypeRepo.GetByID(userID, medicineTypeID);

            var b = this.DetermineMedicineTypeRemainingSupply(medicineTypeDataEntity);

            // If there are no previous SupplyEntries, delete all taken takenFactorRecords for the given medicineType
            if (medicineTypeDataEntity.TMedicineTypeSupplyEntry.Count == 0)
            {
                this.takenMedFactorRecordRepo.DeleteByMedicineTypeID(userID, medicineTypeID);
            }
            // Or if the sum of previous SupplyEntries is 0 or less
            else if (this.DetermineMedicineTypeRemainingSupply(medicineTypeDataEntity) <= 0)
            {
                this.takenMedFactorRecordRepo.DeleteByMedicineTypeID(userID, medicineTypeID);
                this.medicineTypeRepo.DeleteSupplyEntriesByMedicineTypeID(userID, medicineTypeID);
            }


            // Add the new SupplyEntry
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            this.medicineTypeRepo.AddMedicineTypeSupplyEntry(userID, medicineTypeID, supplyQuantity, currentDateTime);
        }
        public void ClearSupplyEntries(int userID, int medicineTypeID)
        {
            this.medicineTypeRepo.DeleteSupplyEntriesByMedicineTypeID(userID, medicineTypeID);

        }
    }
}

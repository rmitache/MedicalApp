﻿using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Services;
using Common;
using Common.DataStructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public class MedicineTypeService : IMedicineTypeService
    {
        // Fields
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
                totalSupplyAmount = medTypeDataEntity.TMedicineTypeSupplyEntry.Select(supplyEntry => supplyEntry.SupplyQuantity).Sum();
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
                        remainingSupplyAmount -= 1;
                    }
                    else
                    {
                        // If it's not packaged into units, each RuleItem will have its own customDoseType
                        // In which case consider the amount to be measured in BaseUnitOfMeasure 
                        remainingSupplyAmount -= takenRecord.PlanMedicineRuleItem.UserDefinedUnitDoseSize;

                    }
                }
            }

            return remainingSupplyAmount;

        }

        // Constructor
        public MedicineTypeService(IMedicineTypeRepository medicineTypeRepo,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
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
        public int? DetermineMedicineTypeRemainingSupply()
        {
            return null;
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
                Range<DateTime> today = new Range<DateTime>(DateTime.Now.StartOfDay(), DateTime.Now.EndOfDay());
                uniqueMedicineTypesInUseToday = this.GetUniqueMedicineTypesInUseByPlans(planBLOs, today);
            }

            // Get supply info for each MedicineType
            Dictionary<string, int?> supplyQuantitiesLeftPerMedicineType = null;
            if (retreiveSupplyAndUsageInfo)
            {
                supplyQuantitiesLeftPerMedicineType = new Dictionary<string, int?>();
                foreach (TMedicineType medTypeDataEntity in dataEntities)
                {
                    var remainingSupplyAmount = this.DetermineMedicineTypeRemainingSupply(medTypeDataEntity);
                    supplyQuantitiesLeftPerMedicineType[medTypeDataEntity.Name] = remainingSupplyAmount;
                }
            }


            // Construct the BLOs
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities, uniqueMedicineTypesInUseToday, supplyQuantitiesLeftPerMedicineType);
            var sortedBLOs = blos.OrderBy(medicineType => medicineType.Name).ToList();


            return sortedBLOs;
        }
    }
}

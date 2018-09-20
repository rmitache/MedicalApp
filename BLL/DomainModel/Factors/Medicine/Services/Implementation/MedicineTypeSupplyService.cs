using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Factors.Medicine.History.Services;
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
    public class MedicineTypeSupplyService : IMedicineTypeSupplyService
    {
        // Fields
        private readonly IMedicineTypeRepository medicineTypeRepo;
        private readonly IMedicineFactorRecordService medicineFactorRecordService;

        // Constructor
        public MedicineTypeSupplyService(
            IMedicineTypeRepository medicineTypeRepo,
            IMedicineFactorRecordService medicineFactorRecordService)
        {
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineFactorRecordService = medicineFactorRecordService;
        }

        // Public methods
        public virtual void AddMedicineTypeSupplyEntry(int userID, int medicineTypeID, int supplyQuantity)
        {
            if (supplyQuantity <= 0)
            {
                throw new ArgumentException("supplyQuantity must be greater than zero");
            }

            // Get the dataEntity and its supplyEntries
            var medicineTypeDataEntity = this.medicineTypeRepo.GetByID(userID, medicineTypeID);

            // If there are previous SupplyEntries, but the current supply amount is 0, delete all existing supply entries
            if (medicineTypeDataEntity.TMedicineTypeSupplyEntry.Count > 0)
            {
                if (this.DetermineCurrentSupplyAmount(medicineTypeDataEntity) == 0)
                {
                    this.medicineTypeRepo.DeleteSupplyEntriesByMedicineTypeID(userID, medicineTypeID);
                }
            }

            // Add the new SupplyEntry
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            this.medicineTypeRepo.AddMedicineTypeSupplyEntry(userID, medicineTypeID, supplyQuantity, currentDateTime);
        }
        public virtual void ClearSupplyEntries(int userID, int medicineTypeID)
        {
            this.medicineTypeRepo.DeleteSupplyEntriesByMedicineTypeID(userID, medicineTypeID);

        }


        public virtual int? DetermineCurrentSupplyAmount(TMedicineType medTypeDataEntity)
        {
            // Return null if there are no supply entries (eg: tracking is inactive)
            if (medTypeDataEntity.TMedicineTypeSupplyEntry.Count == 0)
            {
                return null;
            }

            // Determine the total supply amount
            int totalSupplyAmount = medTypeDataEntity.TMedicineTypeSupplyEntry
                    .Select(supplyEntry => supplyEntry.SupplyQuantity).Sum();
            var firstSupplyEntryDate = medTypeDataEntity.TMedicineTypeSupplyEntry.OrderBy(rec => rec.EntryDateTime).First().EntryDateTime;

            // Determine how much supply is left
            int remainingSupplyAmount = totalSupplyAmount;
            var takenRecords = medTypeDataEntity.TTakenMedicineFactorRecord;
            foreach (TTakenMedicineFactorRecord takenRecord in takenRecords)
            {
                if (takenRecord.ActualTakenDateTime >= firstSupplyEntryDate) // only consider taken records which occurred after the first supplyEntry
                {
                    if (medTypeDataEntity.IsPackagedIntoUnits)
                    {
                        // If it's packaged into units, subtract using the quantity in the ruleItem
                        // Extra info: we assume the amount to be measured in the UnitDoseSizeType 
                        remainingSupplyAmount = remainingSupplyAmount - takenRecord.PlanMedicineRuleItem.UnitDoseQuantifier;
                    }
                    else
                    {
                        // If it's not packaged into units, subtract using userDefinedUnitDoseSize times the quantity in the ruleItem
                        // Extra info: we assume the amount to be measured in BaseUnitOfMeasure 
                        remainingSupplyAmount = remainingSupplyAmount -
                            (int)takenRecord.PlanMedicineRuleItem.UserDefinedUnitDoseSize * takenRecord.PlanMedicineRuleItem.UnitDoseQuantifier;
                    }
                }
            }

            // Handle situations where the user keeps taking factor records, even though the remaining supply is already zero
            if (remainingSupplyAmount <= 0)
            {
                remainingSupplyAmount = 0;
            }

            return remainingSupplyAmount;
        }
        public virtual int? DetermineCurrentSupplyAmount(int userID, int medicineTypeID)
        {
            // Get the MedicineType dataEntity
            var dataEntity = this.medicineTypeRepo.GetByID(userID, medicineTypeID);

            // Calculate remaining supply
            var remainingSupplyAmount = this.DetermineCurrentSupplyAmount(dataEntity);
            return remainingSupplyAmount;
        }

        public virtual DateTime? DetermineSupplyWillLastUntil(int userID, int userTZOffset, int medicineTypeID, bool alreadyComputedSupply = false,
            int? currentSupply = null, int daysLookAhead = 120)
        {
            // Compute supply if it hasnt already been computed
            if (alreadyComputedSupply == false && currentSupply == null)
            {
                currentSupply = this.DetermineCurrentSupplyAmount(userID, medicineTypeID);
            } else if(alreadyComputedSupply == true && currentSupply== null)
            {
                // Return null if already computed supply was null
                return null;
            }

            // Get FactorRecords and then compute the untilDate
            var range = new Range<DateTime>(Functions.GetCurrentDateTimeInUTC(), Functions.GetCurrentDateTimeInUTC().AddDays(daysLookAhead));
            var factorRecords = this.medicineFactorRecordService.GetMedicineFactorRecords(range, userTZOffset, userID);
            DateTime? untilDate = this.DetermineSupplyWillLastUntil(medicineTypeID, factorRecords, currentSupply);
            return untilDate;
        }
        public virtual DateTime? DetermineSupplyWillLastUntil(int medicineTypeID, List<MedicineFactorRecord> factorRecords, int? currentSupply)
        {
            
            return DateTime.UtcNow.AddDays(120);
        }
    }
}
public class SupplyInfoWrapper // This is a temporary wrapper structure used only internally in the BL layer
{
    internal int? CurrentSupplyAmount { get; set; }
    internal DateTime? SupplyWillLastUntil { get; set; }


    internal SupplyInfoWrapper()
    {

    }
}
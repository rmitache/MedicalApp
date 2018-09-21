using BLL.DomainModel.Factors.Medicine.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Services.Implementation
{
    public interface ISupplyCalculationEngine
    {
        int? DetermineCurrentSupplyAmount(TMedicineType medTypeDataEntity);
        DateTime? DetermineSupplyWillLastUntil(int medicineTypeID, List<MedicineFactorRecord> factorRecords, int? currentSupply);
    }
    public class SupplyCalculationEngine : ISupplyCalculationEngine
    {
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
        public virtual DateTime? DetermineSupplyWillLastUntil(int medicineTypeID, List<MedicineFactorRecord> factorRecords, int? currentSupply)
        {
            // Cases
            // 1. CurrentSupply is null
            // 2. CurrentSupply is 0
            // 3. factorRecords are null
            // 4. factorRecords have count 0
            // 5. CurrentSupply is > 0, but not enough for a FactorRecord - return null


            if (currentSupply == null)
            {
                throw new ArgumentNullException("currentSupply");
            }
            if (factorRecords == null)
            {
                throw new ArgumentNullException("factorRecords");
            }
            if (factorRecords.Count == 0 || currentSupply == 0)
            {
                return null;
            }

            // Loop through FactorRecords
            var lastOccurrenceDateTime = DateTime.UtcNow;
            int nextFactorRecordIndex = 0;
            while (currentSupply > 0)
            {

            }

            return lastOccurrenceDateTime;
        }

        public SupplyCalculationEngine()
        {

        }
    }
}

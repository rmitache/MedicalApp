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
        // Private methods
        private int GetSupplyToSubtract(int quantifier, decimal? userDefinedUnitDoseSize)
        {
            if (userDefinedUnitDoseSize == null)
            {
                // If it's packaged into units, return only the quantifier in the ruleItem
                return quantifier;
            }
            else
            {
                // If it's not packaged into units, return the quantity multiplied with the userDefinedUnitDoseSize 
                return quantifier * (int)userDefinedUnitDoseSize;
            }
        }
        // Constructor
        public SupplyCalculationEngine()
        {

        }

        // Public methods
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
                    var supplyToSubtract = this.GetSupplyToSubtract(takenRecord.PlanMedicineRuleItem.UnitDoseQuantifier,
                        takenRecord.PlanMedicineRuleItem.UserDefinedUnitDoseSize);
                    remainingSupplyAmount -= supplyToSubtract;
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
            DateTime? lastOccurrenceDateTime = null;
            foreach (MedicineFactorRecord record in factorRecords)
            {
                if (record.MedicineType.ID == medicineTypeID)
                {
                    var recordAmountToSubtract = this.GetSupplyToSubtract(record.UnitDoseQuantifier, record.UserDefinedUnitDoseSize);

                    // If there is enough to subtract the amount from the current record, do it
                    if (currentSupply - recordAmountToSubtract >= 0)
                    {
                        lastOccurrenceDateTime = record.OccurrenceDateTime;
                        currentSupply -= recordAmountToSubtract;
                    }
                    else
                    {
                        break;
                    }
                }
            }

            return lastOccurrenceDateTime;
        }
    }
}

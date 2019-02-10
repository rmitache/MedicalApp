using BLL.DomainModel.Factors.Medicine.Enums;
using BLL.DomainModel.General.Enums;
using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public class MedicineType
    {
        // Properties
        virtual public int ID { get; set; }
        virtual public string Name { get; set; }
        virtual public string ProducerName { get; set; }

        virtual public UnitOfMeasure BaseUnitOfMeasure { get; set; }
        virtual public bool IsPackagedIntoUnits { get; set; }
        virtual public PackagedUnitDoseType? PackagedUnitDoseType { get; set; }
        virtual public Decimal? PackagedUnitDoseSize { get; set; }

        virtual public bool? IsInUse { get; set; }
        virtual public int? CurrentSupplyAmount { get; set; } // Null if no SupplyEntries exist
        virtual public string CurrentSupplyAmountMeasuredIn
        {
            get
            {
                if(this.IsPackagedIntoUnits)
                {
                    return this.PackagedUnitDoseType.ToString();
                } else
                {
                    return this.BaseUnitOfMeasure.ToString();
                }
            }
        }
        virtual public DateTime? SupplyWillLastUntil { get; set; }
        

        // Constructor
        public MedicineType() { }
    }


}

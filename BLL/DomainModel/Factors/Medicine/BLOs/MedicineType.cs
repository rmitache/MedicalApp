using BLL.DomainModel.Factors.Medicine.Enums;
using BLL.DomainModel.General.Enums;

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
        virtual public int? PackagedUnitDoseSize { get; set; }

        virtual public bool? IsInUse { get; set; }
        virtual public int? RemainingSupply { get; set; } // Null if nothing has been entered (idea: shouldn't it then be 0 ?)
        virtual public string RemainingSupplyMeasuredIn
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

        // Constructor
        public MedicineType() { }
    }


}

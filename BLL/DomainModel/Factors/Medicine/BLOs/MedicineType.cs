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

        virtual public bool IsInUse { get; set; }

        // Constructor
        public MedicineType() { }
    }


}

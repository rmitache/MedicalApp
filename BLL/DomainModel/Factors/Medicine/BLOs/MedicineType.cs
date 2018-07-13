using BLL.DomainModel.Factors.Medicine.Enums;
using BLL.DomainModel.General.Enums;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineType
    {
        // Properties
        virtual public int ID { get; set; }
        virtual public string Name { get; set; }
        virtual public string ProducerName { get; set; }
        virtual public BaseForm BaseForm { get; set; }


        virtual public UnitDoseType? PackagedUnitDoseType { get; set; }
        virtual public int? PackagedUnitDoseSize { get; set; }
        virtual public UnitOfMeasure? PackagedUnitDoseUoM { get; set; }


        // Constructor
        public MedicineType() { }
    }


}

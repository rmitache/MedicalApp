using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;

namespace BLL.DomainModel.Factors.Medicine.Library.BLOs
{
    public  class MedicineType
    {
        // Properties
        public int? ID { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string ProducerName { get; set; }
        public BaseForm BaseForm { get; set; }
        public MedicineCategory[] ParentCategories { get; set; }


        public UnitDoseType? PackagedUnitDoseType { get; set; }
        public int? PackagedUnitDoseSize { get; set; }
        public UnitOfMeasure? PackagedUnitDoseUoM { get; set; }


        // Constructor
        internal MedicineType() { }
    }


}

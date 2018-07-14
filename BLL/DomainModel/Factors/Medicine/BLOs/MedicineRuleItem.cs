

using BLL.DomainModel.Factors.Medicine.Enums;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineRuleItem
    {
        public int ID { get; set; }
        public MedicineType MedicineType { get; set; }
        public int UnitDoseQuantifier { get; set; }

        public bool HasUserDefinedUnitDose { get; set; }
        public UserDefinedUnitDoseType UserDefinedUnitDoseType { get; set; }
        public int? UserDefinedUnitDoseSize { get; set; }

    }


}

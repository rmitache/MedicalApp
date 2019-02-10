

using BLL.DomainModel.Factors.Medicine.Enums;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineRuleItem
    {
        public virtual int ID { get; set; }
        public virtual MedicineType MedicineType { get; set; }

        public virtual int UnitDoseQuantifier { get; set; }
        public virtual bool HasUserDefinedUnitDose { get; set; }
        public virtual UserDefinedUnitDoseType? UserDefinedUnitDoseType { get; set; }
        public virtual decimal? UserDefinedUnitDoseSize { get; set; }

    }


}

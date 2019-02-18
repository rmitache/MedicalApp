

using BLL.DomainModel.Factors.Medicine.Enums;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public class MedicineRuleItem : AbstractMedicineFactorRecord
    {
        public virtual int ID { get; set; }
        public override MedicineType MedicineType { get; set; }

        public override int UnitDoseQuantifier { get; set; }
        public override bool HasUserDefinedUnitDose { get; set; }
        public override UserDefinedUnitDoseType? UserDefinedUnitDoseType { get; set; }
        public override decimal? UserDefinedUnitDoseSize { get; set; }

    }


}

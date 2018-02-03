using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineRuleItem: RuleItem
    {
        public int? ID { get; set; }
        public MedicineType MedicineType { get; set; }

        public UnitDoseType UnitDoseType { get; set; }
        public int UnitDoseQuantifier { get; set; }
        public int UnitDoseSize { get; set; }
        public UnitOfMeasure UnitDoseUoM { get; set; }

        public Instruction Instruction { get; set; }
        public AdministrationMethod Method { get; set; }
    }


}

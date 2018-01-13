using BLL.DomainModel.General.BLOs;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineRuleItem: RuleItem
    {
        public MedicineType MedicineType { get; set; }
        public MedicineMethod Method { get; set; }
        public int NrOfPieces { get; set; }
        public int PieceSize { get; set; }
        public UnitOfMeasure PieceSizeUnitOfMeasure { get; set; }
        public MedicineInstruction[] Instructions { get; set; }
    }


}

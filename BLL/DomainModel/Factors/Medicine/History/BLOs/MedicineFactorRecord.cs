using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public class MedicineFactorRecord
    {
        // Properties
        public MedicineType MedicineType { get; set; }
        public DateTime OccurenceDateTime { get; set; }
        public MedicineMethod Method { get; set; }
        public int NrOfPieces { get; set; }
        public int PieceSize { get; set; }
        public UnitOfMeasure PieceSizeUnitOfMeasure { get; set; }
        public MedicineInstruction[] Instructions { get; set; }


    }


}

using BLL.DomainModel.Factors.BLOs;
using BLL.DomainModel.General.BLOs;
using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public abstract class MedicineFactor: IFactor
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

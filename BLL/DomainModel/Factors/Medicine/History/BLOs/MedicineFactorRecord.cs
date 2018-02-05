using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;

namespace BLL.DomainModel.Factors.Medicine.History.BLOs
{
    public class MedicineFactorRecord
    {
        // Properties
        public int? ID { get; set; }
        public MedicineFactorRecordType Type { get; set; }
        public MedicineType MedicineType { get; set; }
        public DateTime OccurenceDateTime { get; set; }

        public UnitDoseType UnitDoseType { get; set; }
        public int UnitDoseQuantifier { get; set; }
        public int UnitDoseSize { get; set; }
        public UnitOfMeasure UnitDoseUoM { get; set; }

        public Instruction Instruction { get; set; }
        public AdministrationMethod Method { get; set; }



    }


}

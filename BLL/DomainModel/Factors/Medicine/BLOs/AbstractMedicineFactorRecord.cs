using BLL.DomainModel.Factors.Medicine.Enums;
using BLL.DomainModel.General.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public abstract class AbstractMedicineFactorRecord
    {
        public MedicineType MedicineType;
        public UnitDoseType UnitDoseType;
        public int UnitDoseQuantifier;
        public int? UnitDoseSize;
        public UnitOfMeasure UnitDoseUoM;
    }
}


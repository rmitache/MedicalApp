using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.History.BLOs
{
    public abstract class FactorRecordPropertiesGroup
    {
        public MedicineType MedicineType;
        public UnitDoseType UnitDoseType;
        public int UnitDoseQuantifier;
        public int? UnitDoseSize;
        public UnitOfMeasure UnitDoseUoM;
        public Instruction Instruction;
        public AdministrationMethod AdministrationMethod;
    }
}


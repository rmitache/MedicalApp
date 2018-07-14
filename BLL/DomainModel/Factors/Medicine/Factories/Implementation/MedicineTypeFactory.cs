﻿using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.BLOs;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public class MedicineTypeFactory : IMedicineTypeFactory
    {
        // Constructor
        public MedicineTypeFactory()
        {

        }

        // Public methods
        public MedicineType Convert_ToBLO(TMedicineType dataEntity)
        {
            MedicineType blo = new MedicineType();
            blo.ID = dataEntity.Id;
            blo.Name = dataEntity.Name;
            blo.ProducerName = dataEntity.ProducerName;

            blo.BaseUnitOfMeasure = (UnitOfMeasure)dataEntity.BaseUnitOfMeasureId;
            blo.IsPackagedIntoUnits = dataEntity.IsPackagedIntoUnits;
            blo.PackagedUnitDoseType = (dataEntity.PackagedUnitDoseTypeId != null) ? (Enums.PackagedUnitDoseType)dataEntity.PackagedUnitDoseTypeId : (Enums.PackagedUnitDoseType?)null;
            blo.PackagedUnitDoseSize = dataEntity.PackagedUnitDoseSize;
            return blo;
        }
        public List<MedicineType> Convert_ToBLOList(List<TMedicineType> dataEntities)
        {
            var bloList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return bloList;
        }
    }
}

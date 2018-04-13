﻿using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Library.BLOs;

namespace BLL.DomainModel.Indicators.Symptoms.Library.Factories
{
    public class SymptomTypeFactory : ISymptomTypeFactory
    {
        // Constructor
        public SymptomTypeFactory()
        {

        }

        // Public methods
        public SymptomType Convert_ToBLO(TSymptomType dataEntity)
        {
            SymptomType blo = new SymptomType();
            blo.ID = dataEntity.Id;
            blo.Name = dataEntity.Name;
            blo.Description = dataEntity.Description;
            return blo;
        }
        public List<SymptomType> Convert_ToBLOList(List<TSymptomType> dataEntities)
        {
            var bloList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return bloList;
        }
    }
}
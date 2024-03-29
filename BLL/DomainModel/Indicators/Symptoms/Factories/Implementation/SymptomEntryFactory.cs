﻿using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Indicators.Symptoms.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Enums;
using BLL.DomainModel.Indicators.Symptoms.Factories;

namespace BLL.DomainModel.Indicators.Symptoms.Factories
{
    public class SymptomEntryFactory : ISymptomEntryFactory
    {
        // Fields
        private readonly ISymptomTypeFactory symptomTypeFactory;

        // Constructor
        public SymptomEntryFactory(
            ISymptomTypeFactory symptomTypeFactory)
        {
            this.symptomTypeFactory = symptomTypeFactory;
        }

        // Public methods
        public TSymptomEntry Convert_ToDataEntity(SymptomEntry blo)
        {
            TSymptomEntry dataEntity = new TSymptomEntry();
            dataEntity.Id = blo.ID;
            dataEntity.SymptomTypeId = blo.SymptomType.ID;
            dataEntity.IntensityLevelId = (int)blo.IntensityLevel;
            
            return dataEntity;
        }
        public List<TSymptomEntry> Convert_ToDataEntitiesList(List<SymptomEntry> blos)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo)).ToList();
            return dataEntitiesList;
        }
        public SymptomEntry Convert_ToBLO(TSymptomEntry dataEntity)
        {
            SymptomEntry blo = new SymptomEntry();
            blo.ID = dataEntity.Id;
            blo.SymptomType = this.symptomTypeFactory.Convert_ToBLO(dataEntity.SymptomType);
            blo.IntensityLevel = (SymptomIntensityLevel)dataEntity.IntensityLevelId;

            return blo;
        }
        public List<SymptomEntry> Convert_ToBLOList(List<TSymptomEntry> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }

    }
}

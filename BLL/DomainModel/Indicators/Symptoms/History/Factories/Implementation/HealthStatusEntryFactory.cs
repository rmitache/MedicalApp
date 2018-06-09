using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.Plans.BLOs;
using Common.Datastructures;
using System;
using BLL.DomainModel.Plans.Enums;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net;
using BLL.DomainModel.Indicators.Symptoms.History.BLOs;
using BLL.DomainModel.Indicators.Symptoms.History.Enums;

namespace BLL.DomainModel.Indicators.Symptoms.History.Factories
{
    public class HealthStatusEntryFactory : IHealthStatusEntryFactory
    {
        // Fields
        private ISymptomEntryFactory symptomEntryFactory;

        // Constructor
        public HealthStatusEntryFactory(
            ISymptomEntryFactory symptomEntryFactory
            )
        {
            this.symptomEntryFactory = symptomEntryFactory;
        }

        // Public methods
        public THealthStatusEntry Convert_ToDataEntity(HealthStatusEntry blo, int userID)
        {
            THealthStatusEntry dataEntity = new THealthStatusEntry();
            dataEntity.Id = blo.ID;
            dataEntity.UserId = userID;
            dataEntity.OccurrenceDateTime = blo.OccurrenceDateTime;
            dataEntity.HealthLevelId = (int) blo.HealthLevel;
            dataEntity.TSymptomEntry = this.symptomEntryFactory.Convert_ToDataEntitiesList(blo.SymptomEntries);
            return dataEntity;
        }
        public List<THealthStatusEntry> Convert_ToDataEntitiesList(List<HealthStatusEntry> blos, int userID)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo, userID)).ToList();
            return dataEntitiesList;
        }

        public HealthStatusEntry Convert_ToBLO(THealthStatusEntry dataEntity)
        {
            HealthStatusEntry blo = new HealthStatusEntry();
            blo.ID = dataEntity.Id;
            blo.OccurrenceDateTime = dataEntity.OccurrenceDateTime;
            blo.HealthLevel = (HealthLevel)dataEntity.HealthLevelId;
            blo.SymptomEntries = this.symptomEntryFactory.Convert_ToBLOList(dataEntity.TSymptomEntry.ToList());

            return blo;
        }
        public List<HealthStatusEntry> Convert_ToBLOList(List<THealthStatusEntry> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }

    }
}

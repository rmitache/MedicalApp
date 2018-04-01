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

namespace BLL.DomainModel.Indicators.Symptoms.History.Factories
{
    public class HealthStatusEntryFactory : IHealthStatusEntryFactory
    {

        // Constructor
        public HealthStatusEntryFactory()
        {
        }

        // Public methods
        public THealthStatusEntry Convert_ToDataEntity(HealthStatusEntry blo, int userID)
        {
            THealthStatusEntry dataEntity = new THealthStatusEntry();
            dataEntity.Id = blo.ID;
            dataEntity.UserId = userID;
            dataEntity.OccurrenceDateTime = blo.OccurenceDateTime;
            dataEntity.HealthLevelId = (int) blo.HealthLevel;
            return dataEntity;
        }
        public List<THealthStatusEntry> Convert_ToDataEntitiesList(List<HealthStatusEntry> blos, int userID)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo, userID)).ToList();
            return dataEntitiesList;
        }
    }
}

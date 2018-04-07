using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.History.Factories;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Indicators.Symptoms.History.BLOs;
using BLL.DomainModel.Indicators.Symptoms.History.Factories;
using BLL.DomainModel.Plans.Services;
using Common.Datastructures;
using DataAccessLayer.Repositories.HealthStatusEntryRepository;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Indicators.Symptoms.History.Services
{
    public class HealthStatusEntryService : IHealthStatusEntryService
    {
        // Fields
        private readonly IHealthStatusEntryFactory healthStatusEntryFactory;
        private readonly IHealthStatusEntryRepository healthStatusEntryRepo;

        // Constructor
        public HealthStatusEntryService(
            IHealthStatusEntryFactory healthStatusEntryFactory,
            IHealthStatusEntryRepository healthStatusEntryRepo)
        {
            this.healthStatusEntryFactory = healthStatusEntryFactory;
            this.healthStatusEntryRepo = healthStatusEntryRepo;
        }

        // Public methods
        public HealthStatusEntry AddHealthStatusEntry(HealthStatusEntry blo, int userID)
        {
            var dataEntity = this.healthStatusEntryFactory.Convert_ToDataEntity(blo, userID);
            this.healthStatusEntryRepo.AddHealthStatusEntry(dataEntity);

            blo.ID = dataEntity.Id;
            
            return blo;
        }

        public List<HealthStatusEntry> GetHealthStatusEntries(Range<DateTime> dateRange, int userID, bool includeSymptoms)
        {
            var dataEntities = this.healthStatusEntryRepo.GetHealthStatusEntries(dateRange, userID, includeSymptoms);
            var blos = this.healthStatusEntryFactory.Convert_ToBLOList(dataEntities);

            return blos;
        }

    }


}

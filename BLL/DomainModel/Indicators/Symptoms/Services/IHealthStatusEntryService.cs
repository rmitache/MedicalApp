using BLL.DomainModel.Indicators.Symptoms.BLOs;
using Common.DataStructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Indicators.Symptoms.Services
{
    public interface IHealthStatusEntryService
    {
        HealthStatusEntry AddHealthStatusEntry(HealthStatusEntry blo, int userID);
        List<HealthStatusEntry> GetHealthStatusEntries(Range<DateTime> dateRange, int userID, bool includeSymptoms);
        bool GetUserHasAnyHealthStatusEntries(int userID);
    }


}

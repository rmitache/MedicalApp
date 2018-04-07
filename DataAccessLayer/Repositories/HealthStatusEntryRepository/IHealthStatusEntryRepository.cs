using Common.Datastructures;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccessLayer.Repositories.HealthStatusEntryRepository
{
    public interface IHealthStatusEntryRepository
    {
        THealthStatusEntry AddHealthStatusEntry(THealthStatusEntry dataEntity);
        List<THealthStatusEntry> GetHealthStatusEntries(Range<DateTime> dateRange, int userID, bool includeSymptoms);
    }
}

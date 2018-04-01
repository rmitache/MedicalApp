﻿using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Indicators.Symptoms.History.BLOs;
using Common.Datastructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Indicators.Symptoms.History.Services
{
    public interface IHealthStatusEntryService
    {
        HealthStatusEntry AddHealthStatusEntry(HealthStatusEntry blo, int userID);
        //List<HealthStatusEntry> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID);
    }


}

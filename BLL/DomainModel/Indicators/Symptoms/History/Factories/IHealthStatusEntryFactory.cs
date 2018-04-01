using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Indicators.Symptoms.History.BLOs;
using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.History.Factories
{
    public interface IHealthStatusEntryFactory
    {
        THealthStatusEntry Convert_ToDataEntity(HealthStatusEntry blo, int userID);
        List<THealthStatusEntry> Convert_ToDataEntitiesList(List<HealthStatusEntry> blos, int userID);
        HealthStatusEntry Convert_ToBLO(THealthStatusEntry dataEntity);
        List<HealthStatusEntry> Convert_ToBLOList(List<THealthStatusEntry> dataEntities);
    }
}

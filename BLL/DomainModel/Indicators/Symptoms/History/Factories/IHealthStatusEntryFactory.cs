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
        //MedicineFactorRecord Convert_ToBLO(TMedicineFactorRecord dataEntity);
        //List<MedicineFactorRecord> Convert_ToBLOList(List<TMedicineFactorRecord> dataEntities);
        //List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime windowStartDate, DateTime windowEndDate);
    }
}

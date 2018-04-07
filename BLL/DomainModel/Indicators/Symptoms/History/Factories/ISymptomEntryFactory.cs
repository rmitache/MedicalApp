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
    public interface ISymptomEntryFactory
    {
        TSymptomEntry Convert_ToDataEntity(SymptomEntry blo);
        List<TSymptomEntry> Convert_ToDataEntitiesList(List<SymptomEntry> blos);
        SymptomEntry Convert_ToBLO(TSymptomEntry dataEntity);
        List<SymptomEntry> Convert_ToBLOList(List<TSymptomEntry> dataEntities);
    }
}

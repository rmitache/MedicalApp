using BLL.DomainModel.Indicators.Symptoms.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Factories
{
    public interface ISymptomTypeFactory
    {
        SymptomType Convert_ToBLO(TSymptomType dataEntity);
        List<SymptomType> Convert_ToBLOList(List<TSymptomType> dataEntities);
        TSymptomType Convert_ToDataEntity(SymptomType blo, int userID);
    }
}

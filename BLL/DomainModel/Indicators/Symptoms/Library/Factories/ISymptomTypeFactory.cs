using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Library.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Library.Factories
{
    public interface ISymptomTypeFactory
    {
        SymptomType Convert_ToBLO(TSymptomType dataEntity);
        List<SymptomType> Convert_ToBLOList(List<TSymptomType> dataEntities);
    }
}

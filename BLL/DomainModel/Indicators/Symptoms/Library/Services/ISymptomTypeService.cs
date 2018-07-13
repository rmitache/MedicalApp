using BLL.DomainModel.Indicators.Symptoms.Library.BLOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Library.Services
{
    public interface ISymptomTypeService
    {
        List<SymptomType> GetAllSymptomTypes();
    }
}

using BLL.DomainModel.Indicators.Symptoms.BLOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Services
{
    public interface ISymptomTypeService
    {
        List<SymptomType> GetAllSymptomTypes();
        List<SymptomType> GetOnlyRelevantSymptomTypes(int userID);
        List<SymptomType> GetSymptomTypesFromHealthEntries(List<HealthStatusEntry> healthEntries);
    }
}

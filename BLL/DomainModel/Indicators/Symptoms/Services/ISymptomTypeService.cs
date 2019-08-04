using BLL.DomainModel.Indicators.Symptoms.BLOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Services
{
    public interface ISymptomTypeService
    {
        List<SymptomType> GetSymptomTypes(int userID);
        List<SymptomType> GetSymptomTypesInUse(int userID);
        List<SymptomType> GetUniqueSymptomTypesInHealthEntries(List<HealthStatusEntry> healthEntries);
        SymptomType AddCustomSymptomType(SymptomType blo, int userID);
        void RenameCustomSymptomType(int symptomTypeID, string newName, int userID);
        bool SymptomTypeNameExists(int userID, string name, string ignoreName);
        SymptomType DeleteCustomSymptomType(int userId, int symptomTypeID);
    }
}

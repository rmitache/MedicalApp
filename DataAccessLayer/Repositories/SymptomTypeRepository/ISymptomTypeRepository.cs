using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.SymptomTypeRepository
{
    public interface ISymptomTypeRepository
    {
        List<TSymptomType> GetSymptomTypes(int userID);
        List<TSymptomType> GetOnlySymptomTypesInUse(int userID);
        TSymptomType AddCustomSymptomType(TSymptomType dataEntity);
        void UpdateName(int userId, int symptomTypeID, string newName);
        TSymptomType DeleteCustomSymptomType(int userId, int symptomTypeID);

    }
}

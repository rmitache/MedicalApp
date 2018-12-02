using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Indicators.Symptoms.BLOs;

namespace BLL.DomainModel.Indicators.Symptoms.Factories
{
    public class SymptomTypeFactory : ISymptomTypeFactory
    {
        // Constructor
        public SymptomTypeFactory()
        {

        }

        // Public methods
        public SymptomType Convert_ToBLO(TSymptomType dataEntity)
        {
            SymptomType blo = new SymptomType();
            blo.ID = dataEntity.Id;
            blo.IsCustomSymptom = (dataEntity.UserId != null);
            blo.Name = dataEntity.Name;

            return blo;
        }
        public TSymptomType Convert_ToDataEntity(SymptomType blo, int userID)
        {
            TSymptomType dataEntity = new TSymptomType();
            dataEntity.Id = blo.ID;
            dataEntity.UserId = userID;
            dataEntity.Name = blo.Name;

            return dataEntity;
        }
        public List<SymptomType> Convert_ToBLOList(List<TSymptomType> dataEntities)
        {
            var bloList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return bloList;
        }
    }
}

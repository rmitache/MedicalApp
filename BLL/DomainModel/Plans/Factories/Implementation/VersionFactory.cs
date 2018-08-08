using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Plans.Factories
{
    public class VersionFactory : IVersionFactory
    {
        // Fields
        private readonly IRuleFactory ruleFactory;


        // Constructor
        public VersionFactory(IRuleFactory ruleFactory)
        {
            this.ruleFactory = ruleFactory;
        }

        // Public methods
        public TPlanVersion Convert_ToDataEntity(Version blo)
        {
            TPlanVersion dataEntity = new TPlanVersion();
            dataEntity.Id = blo.ID;
            dataEntity.StartDateTime = blo.StartDateTime;
            dataEntity.EndDateTime = blo.EndDateTime;
            dataEntity.TPlanRule = this.ruleFactory.Convert_ToDataEntitiesList(blo.Rules);

            return dataEntity;
        }
        public List<TPlanVersion> Convert_ToDataEntitiesList(List<Version> blos)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo)).ToList();
            return dataEntitiesList;
        }

        public Version Convert_ToBLO(TPlanVersion dataEntity)
        {
            Version blo = new Version();
            blo.ID = dataEntity.Id;
            blo.StartDateTime = dataEntity.StartDateTime;
            blo.EndDateTime = dataEntity.EndDateTime;
            blo.Rules = this.ruleFactory.Convert_ToBLOList(dataEntity.TPlanRule.ToList());

            return blo;
        }
        public List<Version> Convert_ToBLOList(List<TPlanVersion> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }

        
    }
}

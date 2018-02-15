using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Plans.Factories
{
    public class PlanFactory : IPlanFactory
    {
        // Fields
        private readonly IPlanVersionFactory planVersionFactory;
        // Constructor
        public PlanFactory(IPlanVersionFactory planVersionFactory)
        {
            this.planVersionFactory = planVersionFactory;
        }

        // Public methods
        public Plan Convert_ToBLO(TPlan dataEntity)
        {
            Plan blo = new Plan();
            blo.ID = dataEntity.Id;
            blo.Name = dataEntity.Name;
            blo.DateCreated = dataEntity.DateCreated;
            blo.Versions = this.planVersionFactory.Convert_ToBLOList(dataEntity.TPlanVersion.ToList());


            return blo;
        }
        public List<Plan> Convert_ToBLOList(List<TPlan> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }
    }
}

using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Plans.Factories
{
    public class PlanVersionFactory : IPlanVersionFactory
    {
        // Constructor
        public PlanVersionFactory()
        {
        }

        // Public methods
        public Version Convert_ToBLO(TPlanVersion dataEntity)
        {
            Version blo = new Version();
            blo.ID = dataEntity.Id;
            blo.StartDate = dataEntity.StartDate;
            blo.EndDate = dataEntity.EndDate;

            // TODO - SectionHeaders and Rules


            return blo;
        }
        public List<Version> Convert_ToBLOList(List<TPlanVersion> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }
    }
}

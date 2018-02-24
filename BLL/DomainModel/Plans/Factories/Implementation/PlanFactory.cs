﻿using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Plans.Factories
{
    public class PlanFactory : IPlanFactory
    {
        // Fields
        private readonly IVersionFactory planVersionFactory;

        // Constructor
        public PlanFactory(IVersionFactory planVersionFactory)
        {
            this.planVersionFactory = planVersionFactory;
        }

        // Public methods
        public TPlan Convert_ToDataEntity(Plan blo, int userID)
        {
            TPlan dataEntity = new TPlan();
            dataEntity.Id = blo.ID;
            dataEntity.UserId = userID;
            dataEntity.Name = blo.Name;
            dataEntity.DateCreated = blo.DateCreated;
            dataEntity.TPlanVersion = this.planVersionFactory.Convert_ToDataEntitiesList(blo.Versions);

            return dataEntity;
        }
        public List<TPlan> Convert_ToDataEntitiesList(List<Plan> blos, int userID)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo, userID)).ToList();
            return dataEntitiesList;
        }
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

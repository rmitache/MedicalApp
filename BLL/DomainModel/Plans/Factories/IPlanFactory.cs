using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Plans.Factories
{
    public interface IPlanFactory
    {
        TPlan Convert_ToDataEntity(Plan blo, int userID);
        List<TPlan> Convert_ToDataEntitiesList(List<Plan> blos, int userID);
        Plan Convert_ToBLO(TPlan dataEntity);
        List<Plan> Convert_ToBLOList(List<TPlan> dataEntities);
    }
}

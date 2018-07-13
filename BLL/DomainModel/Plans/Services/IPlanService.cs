using BLL.DomainModel.Plans.BLOs;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Plans.Services
{
    public interface IPlanService
    {
        List<Plan> GetPlans(int userID, bool includeRules);
        Plan AddPlan(Plan blo, int userID);
        Plan UpdatePlan(Plan blo, int userID);
    }


}

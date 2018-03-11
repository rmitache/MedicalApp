using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using BLL.DomainModel.Plans.BLOs;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Plans.Services
{
    public interface IPlanService
    {
        List<Plan> GetPlans(int userID, bool includeRules);
        Plan AddPlan(Plan blo, int userID);
        Plan AdjustPlan(Plan blo, int userID);
    }


}

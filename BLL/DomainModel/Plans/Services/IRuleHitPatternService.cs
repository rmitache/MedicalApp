using BLL.DomainModel.Plans.BLOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Factories.Implementation
{
    public interface IRuleHitPatternService
    {

        List<DateTime> GetRuleHitPattern(Rule rule, DateTime localVersionStartDate, DateTime localMinDate, DateTime localMaxDate);
    }
}

using BLL.DomainModel.Plans.BLOs;
using Common.DataStructures;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Factories.Implementation
{
    public interface IRuleHitPatternService
    {

        List<DateTime> GetRuleDateTimeHitsPattern(Rule rule, DateTime utcVersionStartDate, DateTime? utcVersionEndDate, Range<DateTime> utcWindowRange);
    }
}

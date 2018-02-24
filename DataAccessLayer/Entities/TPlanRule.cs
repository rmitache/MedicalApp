using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TPlanRule
    {
        public TPlanRule()
        {
            TPlanMedicineRuleItem = new HashSet<TPlanMedicineRuleItem>();
        }

        public int Id { get; set; }
        public int PlanVersionId { get; set; }
        public int OrdinalFrequencyTypeId { get; set; }
        public int FrequencyTypeId { get; set; }
        public string DaysInWeek { get; set; }
        public string MomentsInDay { get; set; }

        public TPlanVersion PlanVersion { get; set; }
        public ICollection<TPlanMedicineRuleItem> TPlanMedicineRuleItem { get; set; }
    }
}

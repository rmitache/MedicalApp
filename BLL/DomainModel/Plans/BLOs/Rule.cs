using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Plans.Enums;
using Common.Datastructures;
using System.Collections.Generic;

namespace BLL.DomainModel.Plans.BLOs
{
    public class Rule
    {
        // Properties
        public int ID { get; set; }
        public OrdinalFrequencyType OrdinalFrequencyType { get; set; }
        public RuleFrequencyType FrequencyType { get; set; }
        public DaysInWeek DaysInWeek { get; set; }
        public List<Time> MomentsInDay { get; set; }
        public List<MedicineRuleItem> MedicineRuleItems { get; set; }


        // Constructor
        internal Rule() { }
    }



}

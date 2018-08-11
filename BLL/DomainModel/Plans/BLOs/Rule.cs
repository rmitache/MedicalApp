using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Plans.Enums;
using Common.DataStructures;
using System.Collections.Generic;

namespace BLL.DomainModel.Plans.BLOs
{
    public class Rule
    {
        // Properties
        public virtual int ID { get; set; }
        public virtual OrdinalFrequencyType OrdinalFrequencyType { get; set; }
        public virtual RuleFrequencyType FrequencyType { get; set; }
        public virtual DaysInWeek DaysInWeek { get; set; }
        public virtual List<Time> MomentsInDay { get; set; }
        public virtual List<MedicineRuleItem> MedicineRuleItems { get; set; }


        // Constructor
        public Rule() { }
    }



}

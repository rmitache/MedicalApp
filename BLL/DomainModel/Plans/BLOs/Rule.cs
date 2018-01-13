namespace BLL.DomainModel.Plans.BLOs
{
    public class Rule
    {
        // Properties
        public int? OrdinalFrequency { get; set; }
        public FrequencyType FrequencyType { get; set; }
        public DaysInWeek DaysInWeek { get; set; }
        public MomentInDay[] MomentsInDay { get; set; }
        public int Index { get; set; }
        public RuleItem[] RuleItems { get; set; }


        // Constructor
        internal Rule() { }
    }

    public enum FrequencyType
    {
        Daily,
        Weekly
    }
    public class DaysInWeek
    {
        public bool Monday { get; set; } = true;
        public bool Tuesday { get; set; } = true;
        public bool Wednesday { get; set; } = true;
        public bool Thursday { get; set; } = true;
        public bool Friday { get; set; } = true;
        public bool Saturday { get; set; } = true;
        public bool Sunday { get; set; } = true;
    }
    public class MomentInDay
    {
        public int Hours { get; set; }
        public int Minutes { get; set; }
    }
}

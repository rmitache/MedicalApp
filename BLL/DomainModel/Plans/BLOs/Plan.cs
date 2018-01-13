using System;

namespace BLL.DomainModel.Plans.BLOs
{
    public class Plan
    {
        // Properties
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public PlanStatus Status { get; set; }
        public bool HasStarted { get; set; }
        public bool HasEnded { get; set; }
        public PlanVersion[] PlanVersions { get; set; }

        // Constructor
        internal Plan() { }
    }

    public enum PlanStatus
    {
        Active,
        Upcoming,
        Archived
    }

}

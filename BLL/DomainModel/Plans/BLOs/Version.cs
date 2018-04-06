using System;
using System.Collections.Generic;
using Common;

namespace BLL.DomainModel.Plans.BLOs
{
    public class Version
    {
        // Properties
        public int ID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<Rule> Rules { get; set; }

        // Constructor
        internal Version() { }

        //
        public bool RecentlyStarted()
        {
            var currentDate = DateTime.Now.Date;
            
            if(!this.HasEnded() && (currentDate - this.StartDate.Date ).TotalDays  <= 7)
            {
                return true;
            }
            return false;
        }
        public bool HasStarted()
        {
            var currentDate = DateTime.Now.StartOfDay();
            bool hasStarted = this.StartDate > currentDate;
            return hasStarted;
        }
        public bool HasEnded()
        {
            var currentDate = DateTime.Now.StartOfDay();
            bool hasEnded = this.EndDate > currentDate;
            return hasEnded;
        }
    }
    
}

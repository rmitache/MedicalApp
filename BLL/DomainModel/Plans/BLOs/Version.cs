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
        public bool IsRecentAndHasntEnded()
        {
            var currentDate = DateTime.Now.EndOfDay();
            if(!this.HasEnded() && (StartDate.StartOfDay() - currentDate).TotalDays / 7 <= 1)
            {
                return true;
            }
            return false;
        }
        public bool HasEnded()
        {
            var currentDate = DateTime.Now.StartOfDay();
            bool hasEnded = this.EndDate > currentDate;
            return hasEnded;
        }
    }
    
}

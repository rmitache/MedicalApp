using Common.DataStructures;
using System;
using System.Collections.Generic;
using Common;
using BLL.DomainModel.Factors.Medicine.BLOs;

namespace BLL.DomainModel.Plans.BLOs
{
    public class Version
    {
        // Properties
        public int ID { get; set; }
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }
        public List<Rule> Rules { get; set; }

        // Constructor
        internal Version() { }

        // Public methods
        public bool RecentlyStarted()
        {
            var currentDate = Common.Functions.GetCurrentDateTimeInUTC();

            if (!this.HasEnded() && (currentDate - this.StartDateTime.Date).TotalDays <= 7)
            {
                return true;
            }
            return false;
        }
        public bool HasStarted()
        {
            var currentDate = Common.Functions.GetCurrentDateTimeInUTC();
            bool hasStarted = this.StartDateTime > currentDate;
            return hasStarted;
        }
        public bool HasEnded()
        {
            var currentDate = Common.Functions.GetCurrentDateTimeInUTC();
            bool hasEnded = this.EndDateTime > currentDate;
            return hasEnded;
        }
        public Range<DateTime> GetIntersectionWithDateRange(Range<DateTime> targetDateRange)
        {
            // Variables
            Range<DateTime> intersectionResult = null;

            // Get the intersection when there is an EndDate
            if (this.EndDateTime != null)
            {
                intersectionResult = Common.Functions.IntersectDateRanges(new Range<DateTime>(this.StartDateTime, ((DateTime)this.EndDateTime)), targetDateRange);
            }
            // Get the intersection when there is no EndDate
            else if (this.EndDateTime == null)
            {
                // If StartDate is WITHIN the targetDateRange
                if (Common.Functions.DateRangeContains(targetDateRange, this.StartDateTime))
                {
                    intersectionResult = new Range<DateTime>(this.StartDateTime, targetDateRange.RangeEnd);
                }
                // If StartDate is BEFORE the targetDateRange start
                else if (this.StartDateTime < targetDateRange.RangeStart)
                {
                    intersectionResult = new Range<DateTime>(targetDateRange.RangeStart, targetDateRange.RangeEnd);
                }
            }


            return intersectionResult;
        }
        public Dictionary<string, MedicineType> GetUniqueMedicineTypes()
        {
            // Dictionary
            var uniqueMedicineTypesDictionary = new Dictionary<string, MedicineType>();

            // Loop through rules
            foreach (Rule rule in this.Rules)
            {
                // Loop through medicine rule items 
                foreach (MedicineRuleItem medRuleItem in rule.MedicineRuleItems)
                {
                    if (medRuleItem.MedicineType == null)
                    {
                        throw new Exception("MedicineType must be present on MedicineRuleItem BLOs when performing operations");
                    }

                    // Add the medicine type to the dictionary if its not there already
                    if(!uniqueMedicineTypesDictionary.ContainsKey(medRuleItem.MedicineType.Name))
                    {
                        uniqueMedicineTypesDictionary[medRuleItem.MedicineType.Name] = medRuleItem.MedicineType;
                    }

                }
            }

            return uniqueMedicineTypesDictionary;
        }
    }

}

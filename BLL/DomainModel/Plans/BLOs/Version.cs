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
        public virtual int ID { get; set; }
        public virtual DateTime StartDateTime { get; set; }
        public virtual DateTime? EndDateTime { get; set; }
        public virtual List<Rule> Rules { get; set; }

        // Constructor
        public Version() { }

        // Public methods
        public virtual bool RecentlyStarted()
        {
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();

            if (this.HasStarted() && !this.HasEnded() && (currentDateTime - this.StartDateTime).TotalDays <= 7)
            {
                return true;
            }
            return false;
        }
        public virtual bool HasStarted()
        {
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            bool hasStarted = this.StartDateTime < currentDateTime;
            return hasStarted;
        }
        public virtual bool HasEnded()
        {
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            bool hasEnded = currentDateTime > this.EndDateTime ;
            return hasEnded;
        }
        public virtual Range<DateTime> GetIntersectionWithDateRange(Range<DateTime> targetDateRange)
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
        public virtual Dictionary<string, MedicineType> GetUniqueMedicineTypes()
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

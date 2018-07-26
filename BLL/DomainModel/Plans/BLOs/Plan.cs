using BLL.DomainModel.Plans.Enums;
using Common.DataStructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Plans.BLOs
{
    public class Plan
    {
        // Properties
        public int ID { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public List<Version> Versions { get; set; }



        // Constructor
        internal Plan() { }

        // Public methods
        public Version GetLatestVersion()
        {
            if (this.Versions != null && this.Versions.Count > 0)
            {
                return this.Versions[this.Versions.Count - 1];

            }
            return null;

        }
        public Version GetPreviousLatestVersion()
        {
            if (this.Versions != null && this.Versions.Count > 1)
            {
                return this.Versions[this.Versions.Count - 2];

            }
            return null;

        }
        public Version GetFirstVersion()
        {
            if (this.Versions != null && this.Versions.Count > 0)
            {
                return this.Versions[0];

            }
            return null;

        }
        public List<Version> GetVersionsWhichIntersectWithDateRange(Range<DateTime> targetDateRange)
        {
            List<Version> versionsWhichIntersect = new List<Version>();

            // Loop through all version in this plan and add those which intersect with the targetDateRange
            this.Versions.ForEach(version =>
            {
                var intersectionResult = version.GetIntersectionWithDateRange(targetDateRange);
                if (intersectionResult != null)
                {
                    versionsWhichIntersect.Add(version);
                }
            });

            return versionsWhichIntersect;
        }
    }



}

using BLL.DomainModel.Plans.Enums;
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
            if (this.Versions != null && this.Versions.Count>0)
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
    }



}

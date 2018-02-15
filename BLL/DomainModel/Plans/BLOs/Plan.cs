﻿using BLL.DomainModel.Plans.Enums;
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
        public PlanStatus Status { get; set; }
        public bool HasStarted { get; set; }
        public bool HasEnded { get; set; }
        public List<Version> Versions { get; set; }

        // Constructor
        internal Plan() { }
    }



}

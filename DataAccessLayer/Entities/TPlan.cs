﻿using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TPlan
    {
        public TPlan()
        {
            TPlanVersion = new HashSet<TPlanVersion>();
            TTakenMedicineFactorRecord = new HashSet<TTakenMedicineFactorRecord>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }

        public TUser User { get; set; }
        public ICollection<TPlanVersion> TPlanVersion { get; set; }
        public ICollection<TTakenMedicineFactorRecord> TTakenMedicineFactorRecord { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineTypeSupplyEntry
    {
        public int Id { get; set; }
        public int MedicineTypeId { get; set; }
        public int SupplyQuantity { get; set; }
        public DateTime EntryDateTime { get; set; }

        public TMedicineType MedicineType { get; set; }
    }
}

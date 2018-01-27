using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TjMedicineTypeToMedicineCategory
    {
        public int Id { get; set; }
        public int MedicineCategoryId { get; set; }
        public int MedicineTypeId { get; set; }

        public TMedicineCategory MedicineCategory { get; set; }
        public TMedicineType MedicineType { get; set; }
    }
}

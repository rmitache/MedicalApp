using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineCategory
    {
        public TMedicineCategory()
        {
            TjMedicineTypeToMedicineCategory = new HashSet<TjMedicineTypeToMedicineCategory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<TjMedicineTypeToMedicineCategory> TjMedicineTypeToMedicineCategory { get; set; }
    }
}

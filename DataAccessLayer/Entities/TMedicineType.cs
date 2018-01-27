using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineType
    {
        public TMedicineType()
        {
            TjMedicineTypeToMedicineCategory = new HashSet<TjMedicineTypeToMedicineCategory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string ProducerName { get; set; }
        public int FormId { get; set; }
        public int? PieceSize { get; set; }
        public int? PieceSizeUnitOfMeasureId { get; set; }

        public ICollection<TjMedicineTypeToMedicineCategory> TjMedicineTypeToMedicineCategory { get; set; }
    }
}

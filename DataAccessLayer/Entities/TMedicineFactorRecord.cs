using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineFactorRecord
    {
        public TMedicineFactorRecord()
        {
            TTakenMedicineFactorRecord = new HashSet<TTakenMedicineFactorRecord>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int MedicineTypeId { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
        public int UnitDoseTypeId { get; set; }
        public int UnitDoseQuantifier { get; set; }
        public int? UnitDoseSize { get; set; }
        public int? UnitDoseUomId { get; set; }

        public TMedicineType MedicineType { get; set; }
        public TUser User { get; set; }
        public ICollection<TTakenMedicineFactorRecord> TTakenMedicineFactorRecord { get; set; }
    }
}

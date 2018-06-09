using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TTakenMedicineFactorRecord
    {
        public int Id { get; set; }
        public int? PlanId { get; set; }
        public int? MedicineFactorRecordId { get; set; }
        public int MedicineTypeId { get; set; }
        public DateTime OccurrenceDateTime { get; set; }

        public TMedicineFactorRecord MedicineFactorRecord { get; set; }
        public TMedicineType MedicineType { get; set; }
        public TPlan Plan { get; set; }
    }
}

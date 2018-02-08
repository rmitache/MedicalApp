using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineType
    {
        public TMedicineType()
        {
            TMedicineFactorRecord = new HashSet<TMedicineFactorRecord>();
            TjMedicineTypeToMedicineCategory = new HashSet<TjMedicineTypeToMedicineCategory>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string ProducerName { get; set; }
        public int BaseFormId { get; set; }
        public int? PackagedUnitDoseTypeId { get; set; }
        public int? PackagedUnitDoseSize { get; set; }
        public int? PackagedUnitDoseUomId { get; set; }

        public ICollection<TMedicineFactorRecord> TMedicineFactorRecord { get; set; }
        public ICollection<TjMedicineTypeToMedicineCategory> TjMedicineTypeToMedicineCategory { get; set; }
    }
}

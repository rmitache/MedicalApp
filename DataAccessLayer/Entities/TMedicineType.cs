using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineType
    {
        public TMedicineType()
        {
            TMedicineFactorRecord = new HashSet<TMedicineFactorRecord>();
            TPlanMedicineRuleItem = new HashSet<TPlanMedicineRuleItem>();
            TTakenMedicineFactorRecord = new HashSet<TTakenMedicineFactorRecord>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ProducerName { get; set; }
        public int BaseFormId { get; set; }
        public int? PackagedUnitDoseTypeId { get; set; }
        public int? PackagedUnitDoseSize { get; set; }
        public int? PackagedUnitDoseUomId { get; set; }

        public ICollection<TMedicineFactorRecord> TMedicineFactorRecord { get; set; }
        public ICollection<TPlanMedicineRuleItem> TPlanMedicineRuleItem { get; set; }
        public ICollection<TTakenMedicineFactorRecord> TTakenMedicineFactorRecord { get; set; }
    }
}

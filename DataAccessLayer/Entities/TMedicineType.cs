using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TMedicineType
    {
        public TMedicineType()
        {
            TMedicineTypeSupplyEntry = new HashSet<TMedicineTypeSupplyEntry>();
            TPlanMedicineRuleItem = new HashSet<TPlanMedicineRuleItem>();
            TTakenMedicineFactorRecord = new HashSet<TTakenMedicineFactorRecord>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string ProducerName { get; set; }
        public int BaseUnitOfMeasureId { get; set; }
        public bool IsPackagedIntoUnits { get; set; }
        public int? PackagedUnitDoseTypeId { get; set; }
        public decimal? PackagedUnitDoseSize { get; set; }

        public TUser User { get; set; }
        public ICollection<TMedicineTypeSupplyEntry> TMedicineTypeSupplyEntry { get; set; }
        public ICollection<TPlanMedicineRuleItem> TPlanMedicineRuleItem { get; set; }
        public ICollection<TTakenMedicineFactorRecord> TTakenMedicineFactorRecord { get; set; }
    }
}

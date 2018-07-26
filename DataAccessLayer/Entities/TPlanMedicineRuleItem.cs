using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TPlanMedicineRuleItem
    {
        public TPlanMedicineRuleItem()
        {
            TTakenMedicineFactorRecord = new HashSet<TTakenMedicineFactorRecord>();
        }

        public int Id { get; set; }
        public int PlanRuleId { get; set; }
        public int MedicineTypeId { get; set; }
        public int UnitDoseQuantifier { get; set; }
        public bool HasUserDefinedUnitDose { get; set; }
        public int? UserDefinedUnitDoseTypeId { get; set; }
        public int? UserDefinedUnitDoseSize { get; set; }

        public TMedicineType MedicineType { get; set; }
        public TPlanRule PlanRule { get; set; }
        public ICollection<TTakenMedicineFactorRecord> TTakenMedicineFactorRecord { get; set; }
    }
}

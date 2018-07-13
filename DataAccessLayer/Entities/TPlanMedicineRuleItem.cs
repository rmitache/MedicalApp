using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TPlanMedicineRuleItem
    {
        public int Id { get; set; }
        public int PlanRuleId { get; set; }
        public int MedicineTypeId { get; set; }
        public int UnitDoseTypeId { get; set; }
        public int UnitDoseQuantifier { get; set; }
        public int? UnitDoseSize { get; set; }
        public int? UnitDoseUomId { get; set; }

        public TMedicineType MedicineType { get; set; }
        public TPlanRule PlanRule { get; set; }
    }
}

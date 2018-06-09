using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;

namespace BLL.DomainModel.Factors.Medicine.History.BLOs
{
    public class MedicineFactorRecord : AbstractMedicineFactorRecord
    {
        public int ID { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
        public MedicineFactorRecordType Type { get; set; }

        public string ParentPlanName { get; set; }
        public int? ParentPlanID { get; set; }
        public bool? RecentlyAdded { get; set; }
        public bool? Taken { get; set; }


    }


}

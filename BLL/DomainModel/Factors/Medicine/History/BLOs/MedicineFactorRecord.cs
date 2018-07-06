using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;

namespace BLL.DomainModel.Factors.Medicine.History.BLOs
{
    public class MedicineFactorRecord : AbstractMedicineFactorRecord
    {
        public int ID { get; set; }
        public string CompositeID
        {
            get
            {
                return DetermineCompositeID(this);
            }
        }
        public DateTime OccurrenceDateTime { get; set; }
        public MedicineFactorRecordType Type { get; set; }

        public string ParentPlanName { get; set; }
        public int? ParentPlanID { get; set; }
        public bool? RecentlyAdded { get; set; }
        public bool? Taken { get; set; }

        // Static method for computing a CompositeID 
        public static string DetermineCompositeID(MedicineFactorRecord blo)
        {
            // Prepare elements of composite ID 
            var parentPlanIDString = (blo.ParentPlanID == null) ? "NULL" : blo.ParentPlanID.ToString();
            var medicineFactorRecordIDString = (blo.ID == -1 ) ? "NULL" : blo.ID.ToString();
            var medTypeID = blo.MedicineType.ID;
            var occDateTimeString = blo.OccurrenceDateTime.ToString();

            //
            return parentPlanIDString + "_" + medicineFactorRecordIDString + "_" + medTypeID + "_" + occDateTimeString;
        }
        public static string DetermineCompositeID(int? ParentPlanID, int? MedicineFactorRecordID, int MedicineTypeID, DateTime OccurrenceDateTime)
        {
            // Prepare elements of composite ID 
            var parentPlanIDString = (ParentPlanID == null) ? "NULL" : ParentPlanID.ToString();
            var medicineFactorRecordIDString = (MedicineFactorRecordID == null || MedicineFactorRecordID == -1) ? "NULL" : MedicineFactorRecordID.ToString();
            var medTypeID = MedicineTypeID;
            var occDateTimeString = OccurrenceDateTime.ToString();

            //
            return parentPlanIDString + "_" + medicineFactorRecordIDString + "_" + medTypeID + "_" + occDateTimeString;
        }
        public static CompositeIDBreakDown ExtractFromCompositeID(string compositeID)
        {
            var pieces = compositeID.Split('_');

            //
            var newBreakDown = new CompositeIDBreakDown();
            newBreakDown.ParentPlanID = (pieces[0] == "NULL") ? null : (int?)int.Parse(pieces[0]);
            newBreakDown.MedicineFactorRecordID = (pieces[1] == "NULL") ? null : (int?)int.Parse(pieces[1]);
            newBreakDown.MedicineTypeID = int.Parse(pieces[2]);
            newBreakDown.OccurrenceDateTime = DateTime.Parse(pieces[3]);

            return newBreakDown;
        }
    }

    public class CompositeIDBreakDown
    {
        public int? ParentPlanID { get; set; }
        public int? MedicineFactorRecordID { get; set; }
        public int MedicineTypeID { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
    }

}

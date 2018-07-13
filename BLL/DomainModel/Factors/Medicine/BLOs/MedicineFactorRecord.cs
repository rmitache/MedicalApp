using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public class MedicineFactorRecord : AbstractMedicineFactorRecord
    {
        virtual public int ID { get; set; }
        virtual public string CompositeID
        {
            get
            {
                return DetermineCompositeID(this);
            }
        }
        virtual public DateTime OccurrenceDateTime { get; set; }
        virtual public MedicineFactorRecordType Type { get; set; }

        virtual public MedicineType MedicineType { get; set; } // this is written here so it can be set as virtual and the class can be mocked (MOQ)

        virtual public string ParentPlanName { get; set; }
        virtual public int? ParentPlanID { get; set; }
        virtual public bool? RecentlyAdded { get; set; }
        virtual public bool? Taken { get; set; }


        // Public methods
        public static string DetermineCompositeID(MedicineFactorRecord blo)
        {
            //
            return DetermineCompositeID(blo.ParentPlanID, blo.ID, blo.MedicineType.ID, blo.OccurrenceDateTime);
        }
        public static string DetermineCompositeID(int? ParentPlanID, int MedicineFactorRecordID, int MedicineTypeID, DateTime OccurrenceDateTime)
        {
            if (ParentPlanID == null && MedicineFactorRecordID == -1)
            {
                throw new Exception("CompositeID not supported with both ParentPlanID == null and ID == -1");
            }
            if (ParentPlanID != null && MedicineFactorRecordID != -1)
            {
                throw new Exception("CompositeID supports only one of  ParentPlanID or ID being present in non-null or non-minus one form");
            }

            // Prepare elements of composite ID 
            var parentPlanIDString = (ParentPlanID == null) ? "NULL" : ParentPlanID.ToString();
            var medicineFactorRecordIDString = (MedicineFactorRecordID == -1 || MedicineFactorRecordID == null) ? "NULL" : MedicineFactorRecordID.ToString();
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
            newBreakDown.MedicineFactorRecordID = (pieces[1] == "NULL") ? -1 : int.Parse(pieces[1]);
            newBreakDown.MedicineTypeID = int.Parse(pieces[2]);
            newBreakDown.OccurrenceDateTime = DateTime.Parse(pieces[3]);

            return newBreakDown;
        }
    }


    public class CompositeIDBreakDown
    {
        public int? ParentPlanID { get; set; }
        public int MedicineFactorRecordID { get; set; }
        public int MedicineTypeID { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
    }

}

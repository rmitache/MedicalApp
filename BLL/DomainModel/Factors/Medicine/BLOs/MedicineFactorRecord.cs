using BLL.DomainModel.Factors.Medicine.Enums;
using Common.DataStructures;
using Newtonsoft.Json;
using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public class MedicineFactorRecord : AbstractMedicineFactorRecord
    {
        virtual public string CompositeID
        {
            get
            {
                return DetermineCompositeID(this);
            }
        }
        virtual public DateTime OccurrenceDateTime { get; set; }


        public override MedicineType MedicineType { get; set; }
        public override int UnitDoseQuantifier { get; set; }
        public override bool HasUserDefinedUnitDose { get; set; }
        public override UserDefinedUnitDoseType? UserDefinedUnitDoseType { get; set; }
        public override decimal? UserDefinedUnitDoseSize { get; set; }


        virtual public string ParentPlanName { get; set; }
        virtual public int ParentPlanID { get; set; }
        virtual public int MedicineRuleItemID { get; set; }
        virtual public bool? RecentlyAdded { get; set; }
        virtual public bool? Taken { get; set; }

        




        // Public methods
        public static string DetermineCompositeID(MedicineFactorRecord blo)
        {
            return DetermineCompositeID(blo.ParentPlanID, blo.MedicineRuleItemID, blo.MedicineType.ID, blo.OccurrenceDateTime);
        }
        public static string DetermineCompositeID(int ParentPlanID, int MedicineRuleItemID, int MedicineTypeID, DateTime OccurrenceDateTime)
        {

            if (ParentPlanID == -1)
            {
                throw new ArgumentException("ParentPlanID");
            }
            if (MedicineTypeID == -1)
            {
                throw new ArgumentException("MedicineTypeID");
            }

            // Prepare elements of composite ID 
            var occDateTimeString = OccurrenceDateTime.ToString();
            return ParentPlanID + "_" + MedicineRuleItemID + "_" + MedicineTypeID + "_" + occDateTimeString;
        }
        public static CompositeIDBreakDown ExtractFromCompositeID(string compositeID)
        {
            var pieces = compositeID.Split('_');

            //
            var newBreakDown = new CompositeIDBreakDown
            {
                ParentPlanID = int.Parse(pieces[0]),
                MedicineRuleItemID = int.Parse(pieces[1]),
                MedicineTypeID = int.Parse(pieces[2]),
                OccurrenceDateTime = DateTime.Parse(pieces[3])
            };

            return newBreakDown;
        }
    }


    public class CompositeIDBreakDown
    {
        public int ParentPlanID { get; set; }
        public int MedicineRuleItemID { get; set; }
        public int MedicineTypeID { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
    }

}

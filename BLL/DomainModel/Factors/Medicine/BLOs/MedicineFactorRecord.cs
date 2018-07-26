using BLL.DomainModel.Factors.Medicine.Enums;
using Newtonsoft.Json;
using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public class MedicineFactorRecord
    {
        virtual public string CompositeID
        {
            get
            {
                return DetermineCompositeID(this);
            }
        }
        virtual public DateTime OccurrenceDateTime { get; set; }
        virtual public MedicineType MedicineType { get; set; }

        virtual public string ParentPlanName { get; set; }
        virtual public int ParentPlanID { get; set; }
        virtual public bool? RecentlyAdded { get; set; }
        virtual public bool? Taken { get; set; }

        virtual public int UnitDoseQuantifier { get; set; }
        virtual public bool HasUserDefinedUnitDose { get; set; }
        virtual public UserDefinedUnitDoseType? UserDefinedUnitDoseType { get; set; }
        virtual public int? UserDefinedUnitDoseSize { get; set; }



        virtual public string UnitDoseTypeName
        {
            get
            {
                string unitDoseTypeName = "";
                if (this.HasUserDefinedUnitDose == true)
                {
                    unitDoseTypeName = this.UserDefinedUnitDoseType.ToString();
                }
                else if (this.MedicineType != null)
                {
                    unitDoseTypeName = this.MedicineType.PackagedUnitDoseType.ToString();

                }

                return unitDoseTypeName;
            }
        }
        virtual public string UnitOfMeasureName
        {
            get
            {
                string unitOfMeasureName = "";
                 if (this.MedicineType != null)
                {
                    unitOfMeasureName = this.MedicineType.BaseUnitOfMeasure.ToString();

                }

                return unitOfMeasureName;
            }
        }
        virtual public int? UnitDoseSize
        {
            get
            {
                int? unitDoseSize = 0;
                if (this.HasUserDefinedUnitDose == true)
                {
                    unitDoseSize = this.UserDefinedUnitDoseSize;
                }
                else if (this.MedicineType != null)
                {
                    unitDoseSize = this.MedicineType.PackagedUnitDoseSize;

                }

                return unitDoseSize;
            }
        }


        // Public methods
        public static string DetermineCompositeID(MedicineFactorRecord blo)
        {
            //
            return DetermineCompositeID(blo.ParentPlanID, blo.MedicineType.ID, blo.OccurrenceDateTime);
        }
        public static string DetermineCompositeID(int ParentPlanID, int MedicineTypeID, DateTime OccurrenceDateTime)
        {
            
            if(ParentPlanID== -1 )
            {
                throw new ArgumentException("ParentPlanID");
            }
            if (MedicineTypeID == -1)
            {
                throw new ArgumentException("MedicineTypeID");
            }

            // Prepare elements of composite ID 
            var parentPlanIDString = ParentPlanID.ToString();
            var medTypeID = MedicineTypeID;
            var occDateTimeString = OccurrenceDateTime.ToString();

            //
            return parentPlanIDString + "_"  + medTypeID + "_" + occDateTimeString;
        }
        public static CompositeIDBreakDown ExtractFromCompositeID(string compositeID)
        {
            var pieces = compositeID.Split('_');

            //
            var newBreakDown = new CompositeIDBreakDown
            {
                ParentPlanID = int.Parse(pieces[0]),
                MedicineTypeID = int.Parse(pieces[1]),
                OccurrenceDateTime = DateTime.Parse(pieces[2])
            };

            return newBreakDown;
        }
    }


    public class CompositeIDBreakDown
    {
        public int ParentPlanID { get; set; }
        public int MedicineTypeID { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
    }

}

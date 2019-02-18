using BLL.DomainModel.Factors.Medicine.Enums;
using Common.DataStructures;
using Newtonsoft.Json;
using System;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public abstract class AbstractMedicineFactorRecord
    {
        virtual public MedicineType MedicineType { get; set; }

        virtual public int UnitDoseQuantifier { get; set; }
        virtual public bool HasUserDefinedUnitDose { get; set; }
        virtual public UserDefinedUnitDoseType? UserDefinedUnitDoseType { get; set; }
        virtual public decimal? UserDefinedUnitDoseSize { get; set; }


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
        virtual public decimal? UnitDoseSize
        {
            get
            {
                decimal? unitDoseSize = 0;
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


       
    }

}

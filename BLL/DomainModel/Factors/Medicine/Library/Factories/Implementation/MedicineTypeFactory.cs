using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;

namespace BLL.DomainModel.Factors.Medicine.Library.Factories
{
    public class MedicineTypeFactory: IMedicineTypeFactory
    {
        // Constructor
        public MedicineTypeFactory()
        {

        }

        // Public methods
        public MedicineType Convert_ToBLO(TMedicineType dataEntity)
        {
            MedicineType blo = new MedicineType();
            blo.ID = dataEntity.Id;
            blo.Name = dataEntity.Name;
            blo.ShortName = dataEntity.ShortName;
            blo.ProducerName = dataEntity.ProducerName;
            blo.PackagedUnitDoseType = (Enums.UnitDoseType)dataEntity.PackagedUnitDoseTypeId;
            blo.PackagedUnitDoseUoM = (UnitOfMeasure)dataEntity.PackagedUnitDoseUomId;
            blo.ParentCategories = new BLOs.MedicineCategory[] { };

            return blo;
        }
        public List<MedicineType> Convert_ToBLOList(List<TMedicineType> dataEntities)
        {
            var bloList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return bloList;
        }
    }
}

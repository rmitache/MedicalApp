using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.BLOs;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public class MedicineTypeFactory : IMedicineTypeFactory
    {
        // Constructor
        public MedicineTypeFactory()
        {

        }

        // Public methods
        public MedicineType Convert_ToBLO(TMedicineType dataEntity, bool? isInUse = null, int? remainingSupply = null)
        {
            MedicineType blo = new MedicineType();
            blo.ID = dataEntity.Id;
            blo.Name = dataEntity.Name;
            blo.ProducerName = dataEntity.ProducerName;

            blo.BaseUnitOfMeasure = (UnitOfMeasure)dataEntity.BaseUnitOfMeasureId;
            blo.IsPackagedIntoUnits = dataEntity.IsPackagedIntoUnits;
            blo.PackagedUnitDoseType = (dataEntity.PackagedUnitDoseTypeId != null) ? (Enums.PackagedUnitDoseType)dataEntity.PackagedUnitDoseTypeId : (Enums.PackagedUnitDoseType?)null;
            blo.PackagedUnitDoseSize = dataEntity.PackagedUnitDoseSize;

            blo.IsInUse = isInUse;
            blo.RemainingSupply = remainingSupply;

            return blo;
        }
        public TMedicineType Convert_ToDataEntity(MedicineType blo, int userID)
        {
            TMedicineType dataEntity = new TMedicineType();
            dataEntity.Id = blo.ID;
            dataEntity.UserId = userID;
            dataEntity.Name = blo.Name;
            dataEntity.ProducerName = blo.Name;

            dataEntity.BaseUnitOfMeasureId = (int)blo.BaseUnitOfMeasure;
            dataEntity.IsPackagedIntoUnits = blo.IsPackagedIntoUnits;
            dataEntity.PackagedUnitDoseTypeId = (int?)blo.PackagedUnitDoseType;
            dataEntity.PackagedUnitDoseSize = blo.PackagedUnitDoseSize;

            return dataEntity;

        }
        public List<MedicineType> Convert_ToBLOList(List<TMedicineType> dataEntities,
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseToday,
            Dictionary<string, int?> supplyQuantitiesLeftPerMedicineType)
        {

            var bloList = dataEntities.Select(dataEntity =>
            {

                bool? isInUse = null;
                if (uniqueMedicineTypesInUseToday != null)
                {
                    isInUse = uniqueMedicineTypesInUseToday.ContainsKey(dataEntity.Name);
                }
                int? remainingSupply = null;
                if(supplyQuantitiesLeftPerMedicineType!=null)
                {
                    remainingSupply = supplyQuantitiesLeftPerMedicineType[dataEntity.Name];
                }

                return Convert_ToBLO(dataEntity, isInUse, remainingSupply);
            }).ToList();
            return bloList;
        }
    }
}

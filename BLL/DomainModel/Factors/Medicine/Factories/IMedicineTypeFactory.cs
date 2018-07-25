using BLL.DomainModel.Factors.Medicine.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public interface IMedicineTypeFactory
    {
        MedicineType Convert_ToBLO(TMedicineType dataEntity, bool? isInUse = null);
        TMedicineType Convert_ToDataEntity(MedicineType blo, int userID);
        List<MedicineType> Convert_ToBLOList(List<TMedicineType> dataEntities, Dictionary<string, MedicineType> uniqueMedicineTypesInUseToday);
    }
}

using BLL.DomainModel.Factors.Medicine.History.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.History.Factories
{
    public interface IMedicineFactorRecordFactory
    {
        TMedicineFactorRecord Convert_ToDataEntity(MedicineFactorRecord blo, int userID);
        List<TMedicineFactorRecord> Convert_ToDataEntitiesList(List<MedicineFactorRecord> blos, int userID);
        MedicineFactorRecord Convert_ToBLO(TMedicineFactorRecord dataEntity);
        List<MedicineFactorRecord> Convert_ToBLOList(List<TMedicineFactorRecord> dataEntities);
    }
}

using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Plans.Factories
{
    public interface IPlanVersionFactory
    {
        //TMedicineFactorRecord Convert_ToDataEntity(MedicineFactorRecord blo, int userID);
        //List<TMedicineFactorRecord> Convert_ToDataEntitiesList(List<MedicineFactorRecord> blos, int userID);
        BLOs.Version Convert_ToBLO(TPlanVersion dataEntity);
        List<BLOs.Version> Convert_ToBLOList(List<TPlanVersion> dataEntities);
    }
}

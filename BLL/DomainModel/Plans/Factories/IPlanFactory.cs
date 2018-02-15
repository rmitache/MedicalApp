using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Plans.Factories
{
    public interface IPlanFactory
    {
        //TMedicineFactorRecord Convert_ToDataEntity(MedicineFactorRecord blo, int userID);
        //List<TMedicineFactorRecord> Convert_ToDataEntitiesList(List<MedicineFactorRecord> blos, int userID);
        Plan Convert_ToBLO(TPlan dataEntity);
        List<Plan> Convert_ToBLOList(List<TPlan> dataEntities);
    }
}

using BLL.DomainModel.Factors.Medicine.History.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.History.Factories
{
    public interface IMedicineRuleItemFactory
    {
        TPlanMedicineRuleItem Convert_ToDataEntity(MedicineRuleItem blo);
        List<TPlanMedicineRuleItem> Convert_ToDataEntitiesList(List<MedicineRuleItem> blos);
        MedicineRuleItem Convert_ToBLO(TPlanMedicineRuleItem dataEntity);
        List<MedicineRuleItem> Convert_ToBLOList(List<TPlanMedicineRuleItem> dataEntities);
    }
}

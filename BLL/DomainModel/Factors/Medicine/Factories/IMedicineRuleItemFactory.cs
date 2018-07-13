using BLL.DomainModel.Factors.Medicine.BLOs;
using DataAccessLayer.Entities;
using System.Collections.Generic;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public interface IMedicineRuleItemFactory
    {
        TPlanMedicineRuleItem Convert_ToDataEntity(MedicineRuleItem blo);
        List<TPlanMedicineRuleItem> Convert_ToDataEntitiesList(List<MedicineRuleItem> blos);
        MedicineRuleItem Convert_ToBLO(TPlanMedicineRuleItem dataEntity);
        List<MedicineRuleItem> Convert_ToBLOList(List<TPlanMedicineRuleItem> dataEntities);
    }
}

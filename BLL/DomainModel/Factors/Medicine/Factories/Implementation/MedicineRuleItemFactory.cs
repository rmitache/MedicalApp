using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Enums;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public class MedicineRuleItemFactory : IMedicineRuleItemFactory
    {
        // Fields
        private readonly IMedicineTypeFactory medicineTypeFactory;

        // Constructor
        public MedicineRuleItemFactory(IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public TPlanMedicineRuleItem Convert_ToDataEntity(MedicineRuleItem blo)
        {
            TPlanMedicineRuleItem dataEntity = new TPlanMedicineRuleItem();
            dataEntity.Id = blo.ID;

            dataEntity.MedicineTypeId = blo.MedicineType.ID;
            dataEntity.UnitDoseQuantifier = blo.UnitDoseQuantifier;
            dataEntity.UnitDoseTypeId = (int)blo.UnitDoseType;
            dataEntity.UnitDoseSize = blo.UnitDoseSize;
            dataEntity.UnitDoseUomId = (int) blo.UnitDoseUoM;
            dataEntity.InstructionId = (int)blo.Instruction;
            dataEntity.AdministrationMethodId = (int)blo.AdministrationMethod;

            return dataEntity;
        }
        public List<TPlanMedicineRuleItem> Convert_ToDataEntitiesList(List<MedicineRuleItem> blos)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo)).ToList();
            return dataEntitiesList;
        }
        public MedicineRuleItem Convert_ToBLO(TPlanMedicineRuleItem dataEntity)
        {
            MedicineRuleItem blo = new MedicineRuleItem();
            blo.ID = dataEntity.Id;
            blo.MedicineType = this.medicineTypeFactory.Convert_ToBLO(dataEntity.MedicineType);
            blo.UnitDoseQuantifier = dataEntity.UnitDoseQuantifier;
            blo.UnitDoseType = (UnitDoseType)dataEntity.UnitDoseTypeId;
            blo.UnitDoseSize = (int)dataEntity.UnitDoseSize;
            blo.UnitDoseUoM = (UnitOfMeasure)dataEntity.UnitDoseUomId;
            blo.Instruction = (Instruction)dataEntity.InstructionId;


            return blo;
        }
        public List<MedicineRuleItem> Convert_ToBLOList(List<TPlanMedicineRuleItem> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }
    }
}

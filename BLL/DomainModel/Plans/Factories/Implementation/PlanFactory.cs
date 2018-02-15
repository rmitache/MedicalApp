using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.Plans.BLOs;

namespace BLL.DomainModel.Plans.Factories
{
    public class PlanFactory : IPlanFactory
    {
        // Fields
        private readonly IMedicineTypeFactory medicineTypeFactory;
        // Constructor
        public PlanFactory(IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public Plan Convert_ToBLO(TPlan dataEntity)
        {
            Plan blo = new Plan();
            blo.ID = dataEntity.Id;
            //blo.Type = MedicineFactorRecordType.UserEntry;
            //blo.MedicineType = this.medicineTypeFactory.Convert_ToBLO(dataEntity.MedicineType);
            //blo.OccurenceDateTime = dataEntity.OccurrenceDateTime;

            //blo.UnitDoseQuantifier = dataEntity.UnitDoseQuantifier;
            //blo.UnitDoseType = (UnitDoseType)dataEntity.UnitDoseTypeId;
            //blo.UnitDoseSize = (int)dataEntity.UnitDoseSize;
            //blo.UnitDoseUoM = (UnitOfMeasure)dataEntity.UnitDoseUomId;

            //blo.Instruction = (Instruction)dataEntity.InstructionId;


            return blo;
        }
        public List<Plan> Convert_ToBLOList(List<TPlan> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }
    }
}

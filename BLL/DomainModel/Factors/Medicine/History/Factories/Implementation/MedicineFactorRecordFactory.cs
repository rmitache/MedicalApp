using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;

namespace BLL.DomainModel.Factors.Medicine.History.Factories
{
    public class MedicineFactorRecordFactory : IMedicineFactorRecordFactory
    {
        // Fields
        private readonly IMedicineTypeFactory medicineTypeFactory;
        // Constructor
        public MedicineFactorRecordFactory(IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public TMedicineFactorRecord Convert_ToDataEntity(MedicineFactorRecord blo, int userID)
        {
            TMedicineFactorRecord dataEntity = new TMedicineFactorRecord();
            dataEntity.Id = blo.ID ?? default(int);
            dataEntity.UserId = userID;
            dataEntity.MedicineTypeId = blo.MedicineType.ID ?? default(int);
            dataEntity.OccurrenceDateTime = blo.OccurenceDateTime;

            dataEntity.UnitDoseQuantifier = blo.UnitDoseQuantifier;
            dataEntity.UnitDoseTypeId = (int)blo.UnitDoseType;
            dataEntity.UnitDoseSize = blo.UnitDoseSize;
            dataEntity.UnitDoseUomId = (int) blo.UnitDoseUoM;

            dataEntity.InstructionId = (int)blo.Instruction;
            dataEntity.AdministrationMethodId = (int)blo.AdministrationMethod;
            return dataEntity;
        }
        public List<TMedicineFactorRecord> Convert_ToDataEntitiesList(List<MedicineFactorRecord> blos, int userID)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo, userID)).ToList();
            return dataEntitiesList;
        }
        public MedicineFactorRecord Convert_ToBLO(TMedicineFactorRecord dataEntity)
        {
            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.Type = MedicineFactorRecordType.UserEntry;
            blo.MedicineType = this.medicineTypeFactory.Convert_ToBLO(dataEntity.MedicineType);
            blo.OccurenceDateTime = dataEntity.OccurrenceDateTime;

            blo.UnitDoseQuantifier = dataEntity.UnitDoseQuantifier;
            blo.UnitDoseType = (UnitDoseType)dataEntity.UnitDoseTypeId;
            blo.UnitDoseSize = (int)dataEntity.UnitDoseSize;
            blo.UnitDoseUoM = (UnitOfMeasure)dataEntity.UnitDoseUomId;

            blo.Instruction = (Instruction)dataEntity.InstructionId;


            return blo;
        }
        public List<MedicineFactorRecord> Convert_ToBLOList(List<TMedicineFactorRecord> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }
    }
}

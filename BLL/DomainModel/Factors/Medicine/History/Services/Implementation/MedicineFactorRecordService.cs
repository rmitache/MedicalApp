using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.History.Factories;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public class MedicineFactorRecordService : IMedicineFactorRecordService
    {
        // Fields
        private readonly IMedicineFactorRecordRepository medicineFactorRecordRepo;
        private readonly IMedicineFactorRecordFactory medicineFactorRecordFactory;
        private readonly IMedicineTypeFactory medicineTypeFactory;

        // Constructor
        public MedicineFactorRecordService(
            IMedicineFactorRecordRepository medicineFactorRecordRepo,
            IMedicineFactorRecordFactory medicineFactorRecordFactory,
            IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineFactorRecordRepo = medicineFactorRecordRepo;
            this.medicineFactorRecordFactory = medicineFactorRecordFactory;
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public List<MedicineFactorRecord> AddMedicineFactorRecords(List<MedicineFactorRecord> blos, int userID)
        {
            var dataEntities = this.medicineFactorRecordFactory.Convert_ToDataEntitiesList(blos, userID);
            this.medicineFactorRecordRepo.AddMedicineFactorRecords(dataEntities);


            // Update IDs on BLOs which will be returned
            for(int i=0;i <dataEntities.Count;i++)
            {
                blos[i].ID = dataEntities[i].Id;
            }

            return blos;
        }
        public List<MedicineFactorRecord> GetMedicineFactorRecords(DateTime date, int userID)
        {
            var dataEntities = this.medicineFactorRecordRepo.GetMedicineFactorRecords(date, userID);
            var blos = this.medicineFactorRecordFactory.Convert_ToBLOList(dataEntities);
            return blos;
        }


    }


}

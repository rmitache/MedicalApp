﻿using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Factors.Medicine.History.Services;
using BLL.DomainModel.Factors.Medicine.Services.Implementation;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Services;
using Common;
using Common.DataStructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public class MedicineTypeSupplyService : IMedicineTypeSupplyService
    {
        // Fields
        private readonly IMedicineTypeRepository medicineTypeRepo;
        private readonly IMedicineFactorRecordService medicineFactorRecordService;
        private readonly ISupplyCalculationEngine supplyCalculationEngine;
        private readonly int supplyComputationMaxLookAheadInDays = 230;

        // Private methods
        private SupplyInfoWrapper DetermineSupplyInfo(int userID, TMedicineType medTypeDataEntity, List<MedicineFactorRecord> factorRecords)
        {
            // Variables
            var supplyInfo = new SupplyInfoWrapper();
            supplyInfo.CurrentSupplyAmount = this.supplyCalculationEngine.DetermineCurrentSupplyAmount(medTypeDataEntity);
            supplyInfo.SupplyWillLastUntil = (supplyInfo.CurrentSupplyAmount == null) ? null :
                this.supplyCalculationEngine.DetermineSupplyWillLastUntil(medTypeDataEntity.Id, factorRecords, supplyInfo.CurrentSupplyAmount);

            return supplyInfo;
        }

        // Constructor
        public MedicineTypeSupplyService(
            IMedicineTypeRepository medicineTypeRepo,
            IMedicineFactorRecordService medicineFactorRecordService,
            ISupplyCalculationEngine supplyCalculationEngine)
        {
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineFactorRecordService = medicineFactorRecordService;
            this.supplyCalculationEngine = supplyCalculationEngine;
        }


        // Public methods
        public virtual void AddMedicineTypeSupplyEntry(int userID, int medicineTypeID, int supplyQuantity)
        {
            if (supplyQuantity <= 0)
            {
                throw new ArgumentException("supplyQuantity must be greater than zero");
            }

            // Get the dataEntity and its supplyEntries
            var medicineTypeDataEntity = this.medicineTypeRepo.GetByID(userID, medicineTypeID);

            // If there are previous SupplyEntries, but the current supply amount is 0, delete all existing supply entries
            if (medicineTypeDataEntity.TMedicineTypeSupplyEntry.Count > 0)
            {
                if (this.supplyCalculationEngine.DetermineCurrentSupplyAmount(medicineTypeDataEntity) == 0)
                {
                    this.medicineTypeRepo.DeleteSupplyEntriesByMedicineTypeID(userID, medicineTypeID);
                }
            }

            // Add the new SupplyEntry
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            this.medicineTypeRepo.AddMedicineTypeSupplyEntry(userID, medicineTypeID, supplyQuantity, currentDateTime);
        }
        public virtual void ClearSupplyEntries(int userID, int medicineTypeID)
        {
            this.medicineTypeRepo.DeleteSupplyEntriesByMedicineTypeID(userID, medicineTypeID);

        }

        public virtual Dictionary<string, SupplyInfoWrapper> GetDictionaryOfSupplyInfos(int userID, List<TMedicineType> medTypeDataEntities)
        {
            // Variables
            var dict = new Dictionary<string, SupplyInfoWrapper>();

            // Get the cut-off date and FactorRecords
            var utcDateRange = new Range<DateTime>(Functions.GetCurrentDateTimeInUTC(), 
                Functions.GetCurrentDateTimeInUTC().AddDays(this.supplyComputationMaxLookAheadInDays));
            var factorRecords = this.medicineFactorRecordService.GetMedicineFactorRecords(utcDateRange, userID);

            // Loop and get supplyInfo for each medicineTypeDataEntity
            foreach (TMedicineType dataEntity in medTypeDataEntities)
            {
                dict[dataEntity.Name] = this.DetermineSupplyInfo(userID, dataEntity, factorRecords);
            }

            return dict;
        }
        public virtual SupplyInfoWrapper GetCurrentSupplyInfo(int userID, TMedicineType dataEntity)
        {
            // Variables
            SupplyInfoWrapper supplyInfo;

            // Get the cut-off date and FactorRecords
            var range = new Range<DateTime>(Functions.GetCurrentDateTimeInUTC(), Functions.GetCurrentDateTimeInUTC().AddDays(120));
            var factorRecords = this.medicineFactorRecordService.GetMedicineFactorRecords(range, userID);

            // Get supplyInfo
            supplyInfo = this.DetermineSupplyInfo(userID, dataEntity, factorRecords);
            return supplyInfo;
        }
        public virtual SupplyInfoWrapper GetCurrentSupplyInfo(int userID, int medicineTypeID)
        {
            var dataEntity = this.medicineTypeRepo.GetByID(userID, medicineTypeID);
            return GetCurrentSupplyInfo(userID, dataEntity);
        }
    }
}
public class SupplyInfoWrapper
{
    public int? CurrentSupplyAmount { get; set; }
    public DateTime? SupplyWillLastUntil { get; set; }


    public SupplyInfoWrapper()
    {

    }
}

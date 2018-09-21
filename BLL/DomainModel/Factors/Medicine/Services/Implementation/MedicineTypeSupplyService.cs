using BLL.DomainModel.Factors.Medicine.BLOs;
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

        // Private methods

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

        // Idea > mb the usage info should be here as a method as well ?

        // GetCurrentSupplyInfo 
        //  - 1 method called by MedicineTypeService, when getting the list of all MedicineTypes with usage/supply information
        //  - 1 method called by HomeController, when recalculating SupplyInfo
        // Why 2 diff. methods ?
        // Answer: the first one already has the deep dataEntities, 


        public virtual SupplyInfoWrapper GetCurrentSupplyInfo(TMedicineType medTypeDataEntity, int userTZOffset)
        {
            var supplyInfo = new SupplyInfoWrapper();

            // Get the current Supply amount
            supplyInfo.CurrentSupplyAmount = this.supplyCalculationEngine.DetermineCurrentSupplyAmount(medTypeDataEntity);

            // Get the cut-off date
            var range = new Range<DateTime>(Functions.GetCurrentDateTimeInUTC(), Functions.GetCurrentDateTimeInUTC().AddDays(120));
            var factorRecords = this.medicineFactorRecordService.GetMedicineFactorRecords(range, userTZOffset, medTypeDataEntity.UserId);
            supplyInfo.SupplyWillLastUntil = this.supplyCalculationEngine.DetermineSupplyWillLastUntil(medTypeDataEntity.Id, factorRecords,
                supplyInfo.CurrentSupplyAmount);

            return supplyInfo;
        }





        //public virtual int? DetermineCurrentSupplyAmount(int userID, int medicineTypeID)
        //{
        //    // Get the MedicineType dataEntity
        //    var dataEntity = this.medicineTypeRepo.GetByID(userID, medicineTypeID);

        //    // Calculate remaining supply
        //    var remainingSupplyAmount = this.DetermineCurrentSupplyAmount(dataEntity);
        //    return remainingSupplyAmount;
        //}

        //public virtual DateTime? DetermineSupplyWillLastUntil(int userID, int userTZOffset, int medicineTypeID, bool alreadyComputedSupply = false,
        //    int? currentSupply = null, int daysLookAhead = 120)
        //{
        //    // Compute supply if it hasnt already been computed
        //    if (alreadyComputedSupply == false && currentSupply == null)
        //    {
        //        currentSupply = this.DetermineCurrentSupplyAmount(userID, medicineTypeID);
        //    }
        //    else if (alreadyComputedSupply == true && currentSupply == null)
        //    {
        //        // Return null if already computed supply was null
        //        return null;
        //    }

        //    // Get FactorRecords and then compute the untilDate
        //    var range = new Range<DateTime>(Functions.GetCurrentDateTimeInUTC(), Functions.GetCurrentDateTimeInUTC().AddDays(daysLookAhead));
        //    var factorRecords = this.medicineFactorRecordService.GetMedicineFactorRecords(range, userTZOffset, userID);
        //    DateTime? untilDate = this.DetermineSupplyWillLastUntil(medicineTypeID, factorRecords, currentSupply);
        //    return untilDate;
        //}
        
    }
}
public class SupplyInfoWrapper // This is a temporary wrapper structure used only internally in the BL layer
{
    internal int? CurrentSupplyAmount { get; set; }
    internal DateTime? SupplyWillLastUntil { get; set; }


    internal SupplyInfoWrapper()
    {

    }
}

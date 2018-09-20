using BLL.DomainModel.Factors.Medicine.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public interface IMedicineTypeSupplyService
    {
        void AddMedicineTypeSupplyEntry(int userID, int MedicineTypeID, int SupplyQuantity);
        void ClearSupplyEntries(int userID, int medicineTypeID);

        int? DetermineCurrentSupplyAmount(TMedicineType medTypeDataEntity);
        int? DetermineCurrentSupplyAmount(int userID, int medicineTypeID);
        DateTime? DetermineSupplyWillLastUntil(TMedicineType medTypeDataEntity, int? currentSupply);
        DateTime? DetermineSupplyWillLastUntil(int userID, int medicineTypeID);
    }
}

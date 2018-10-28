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

        Dictionary<string, SupplyInfoWrapper> GetDictionaryOfSupplyInfos(int userID, List<TMedicineType> dataEntities);
        SupplyInfoWrapper GetCurrentSupplyInfo(int userID, TMedicineType dataEntity);
        SupplyInfoWrapper GetCurrentSupplyInfo(int userID, int medicineTypeID);
    }
}

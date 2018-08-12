using BLL.DomainModel.Factors.Medicine.BLOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public interface IMedicineTypeService
    {
        MedicineType AddMedicineType(MedicineType blo, int userID);
        List<MedicineType> GetAllMedicineTypes(int userID, bool retreiveSupplyAndUsageInfo = false);
        void AddMedicineTypeSupplyEntry(int userID, int MedicineTypeID, int SupplyQuantity);
        void ClearSupplyEntries(int userID, int medicineTypeID);
        bool MedicineTypeNameExists(int userID, string name, string ignoreName);
    }
}

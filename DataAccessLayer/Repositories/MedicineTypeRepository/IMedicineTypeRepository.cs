using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.MedicineTypeRepository
{
    public interface IMedicineTypeRepository
    {
        TMedicineType AddMedicineType(TMedicineType dataEntity);
        TMedicineTypeSupplyEntry AddMedicineTypeSupplyEntry(int userID, int MedicineTypeID, int SupplyQuantity);
        List<TMedicineType> GetAllMedicineTypes(int userID, bool includeSupplyEntriesAndTakenRecords = false);
    }
}

using Common.Datastructures;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccessLayer.Repositories.MedicineFactorRecordRepository
{
    public interface IMedicineFactorRecordRepository
    {
        List<TMedicineFactorRecord> AddMedicineFactorRecords(List<TMedicineFactorRecord> factorRecords);
        List<TMedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID);
    }
}

using Common.Datastructures;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository
{
    public interface ITakenMedicineFactorRecordRepository
    {
        void AddTakenMedicineFactorRecords(List<TTakenMedicineFactorRecord> factorRecords);
        void RemoveTakenMedicineFactorRecords(List<TTakenMedicineFactorRecord> factorRecords);
        List<TTakenMedicineFactorRecord> GetTakenMedicineFactorRecords(Range<DateTime> dateRange, int userID);
    }
}

using BLL.DomainModel.Factors.Medicine.BLOs;
using Common.DataStructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public interface IMedicineFactorRecordService
    {
        void MarkFactorRecordsAsTaken(string[] compositeIDs, bool[] newTakenStatuses, int userID);
        List<MedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID);
    }


}

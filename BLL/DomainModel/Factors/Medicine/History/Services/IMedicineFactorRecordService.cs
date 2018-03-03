using BLL.DomainModel.Factors.Medicine.History.BLOs;
using Common.Datastructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public interface IMedicineFactorRecordService
    {
        List<MedicineFactorRecord> AddMedicineFactorRecords(List<MedicineFactorRecord> blos, int userID);
        List<MedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID);
    }


}

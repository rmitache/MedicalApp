using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Factors.Medicine.History.Services
{
    public interface IMedicineFactorRecordService
    {
        List<MedicineFactorRecord> AddMedicineFactorRecords(List<MedicineFactorRecord> blos, int userID);
        List<MedicineFactorRecord> GetMedicineFactorRecords(DateTime date, int userID);
    }


}

using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public interface IMedicineFactorRecordFactory
    {
        List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime windowStartDate, DateTime windowEndDate);
    }
}

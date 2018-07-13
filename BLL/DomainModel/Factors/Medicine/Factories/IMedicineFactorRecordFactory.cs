﻿using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public interface IMedicineFactorRecordFactory
    {
        TMedicineFactorRecord Convert_ToDataEntity(MedicineFactorRecord blo, int userID);
        List<TMedicineFactorRecord> Convert_ToDataEntitiesList(List<MedicineFactorRecord> blos, int userID);
        MedicineFactorRecord Convert_ToBLO(TMedicineFactorRecord dataEntity);
        List<MedicineFactorRecord> Convert_ToBLOList(List<TMedicineFactorRecord> dataEntities);
        List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime windowStartDate, DateTime windowEndDate);
    }
}
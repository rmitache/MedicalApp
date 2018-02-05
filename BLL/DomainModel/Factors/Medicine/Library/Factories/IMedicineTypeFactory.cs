using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineTypesRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Library.Factories
{
    public interface IMedicineTypeFactory
    {
        MedicineType Convert_ToBLO(TMedicineType dataEntity);
        List<MedicineType> Convert_ToBLOList(List<TMedicineType> dataEntities);
    }
}

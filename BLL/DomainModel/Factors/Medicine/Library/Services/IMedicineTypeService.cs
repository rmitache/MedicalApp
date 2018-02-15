using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public interface IMedicineTypeService
    {
        List<MedicineType> GetAllMedicineTypes();
    }
}

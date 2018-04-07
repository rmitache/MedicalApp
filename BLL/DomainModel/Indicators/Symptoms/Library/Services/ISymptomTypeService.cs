using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Library.BLOs;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Library.Services
{
    public interface ISymptomTypeService
    {
        List<SymptomType> GetAllSymptomTypes();
    }
}

using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Indicators.Symptoms.Library.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Library.Factories;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using DataAccessLayer.Repositories.SymptomTypeRepository;
using System.Collections.Generic;

namespace BLL.DomainModel.Indicators.Symptoms.Library.Services
{
    public class SymptomTypeService: ISymptomTypeService
    {
        // Fields
        private readonly ISymptomTypeRepository symptomTypeRepo;
        private readonly ISymptomTypeFactory symptomTypeFactory;

        // Constructor
        public SymptomTypeService(ISymptomTypeRepository symptomTypeRepo, ISymptomTypeFactory symptomTypeFactory)
        {
            this.symptomTypeRepo = symptomTypeRepo;
            this.symptomTypeFactory = symptomTypeFactory;
        }

        // Public methods
        public List<SymptomType> GetAllSymptomTypes()
        {
            var dataEntities = this.symptomTypeRepo.GetAllSymptomTypes();
            var blos = this.symptomTypeFactory.Convert_ToBLOList(dataEntities);
            
            return blos;
        }
    }
}

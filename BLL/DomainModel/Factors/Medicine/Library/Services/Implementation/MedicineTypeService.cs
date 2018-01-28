using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using DataAccessLayer.Repositories.MedicineTypesRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public class MedicineTypeService: IMedicineTypeService
    {
        // Fields
        private readonly IMedicineTypeRepository medicineTypeRepo;
        private readonly IMedicineTypeFactory medicineTypeFactory;

        // Constructor
        public MedicineTypeService(IMedicineTypeRepository medicineTypeRepo, IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public List<MedicineType> GetAllMedicineTypes()
        {
            var dataEntities = this.medicineTypeRepo.GetAllMedicineTypes();
            //var blos 
            return null;
        }
    }
}

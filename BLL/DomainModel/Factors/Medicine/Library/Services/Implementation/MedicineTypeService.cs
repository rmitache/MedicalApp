using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using System.Collections.Generic;

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
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities);
            
            return blos;
        }
    }
}

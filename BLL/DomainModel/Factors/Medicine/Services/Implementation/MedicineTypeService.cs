using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using System.Collections.Generic;
using System.Linq;

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
        public MedicineType AddMedicineType(MedicineType blo, int userID)
        {
            var dataEntity = this.medicineTypeFactory.Convert_ToDataEntity(blo, userID);
            this.medicineTypeRepo.AddMedicineType(dataEntity);

            blo.ID = dataEntity.Id;

            return blo;
        }
        public List<MedicineType> GetAllMedicineTypes(int userID)
        {
            var dataEntities = this.medicineTypeRepo.GetAllMedicineTypes(userID);
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities);

            // Sort alphabetically
            var sortedBLOs = blos.OrderBy(medicineType => medicineType.Name).ToList();


            return sortedBLOs;
        }
    }
}

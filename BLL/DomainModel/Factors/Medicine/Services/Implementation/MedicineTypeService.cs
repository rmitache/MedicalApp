using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Plans.Services;
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
        private readonly IPlanService planService;

        // Constructor
        public MedicineTypeService(IMedicineTypeRepository medicineTypeRepo, 
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineTypeFactory = medicineTypeFactory;
            this.planService = planService;
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
            // Get all the medicineTypes available for the current user 
            var dataEntities = this.medicineTypeRepo.GetAllMedicineTypes(userID);
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities);

            // Sort alphabetically
            var sortedBLOs = blos.OrderBy(medicineType => medicineType.Name).ToList();


            return sortedBLOs;
        }
    }
}

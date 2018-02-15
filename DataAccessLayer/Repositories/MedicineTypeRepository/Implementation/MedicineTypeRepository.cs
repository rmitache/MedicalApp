using DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Linq;

namespace DataAccessLayer.Repositories.MedicineTypeRepository
{
    public class MedicineTypeRepository : IMedicineTypeRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public MedicineTypeRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public List<TMedicineType> GetAllMedicineTypes()
        {
            return entitiesContext.TMedicineType.Select(medicineType => medicineType).ToList();
        }
    }
}


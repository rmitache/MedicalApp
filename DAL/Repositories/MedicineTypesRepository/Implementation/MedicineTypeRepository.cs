using DAL.Entities;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace DAL.Repositories.MedicineTypesRepository
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
        public List<t_medicine_type> GetAllMedicineTypes()
        {
            return entitiesContext.t_medicine_type.Select(medicineType => medicineType).ToList();
        }
    }
}




//namespace DAL.Repositories.MedicineTypesRepository
//{
//    public class MedicineTypeRepository : IMedicineTypeRepository
//    {
//        // Fields
//        private readonly DbContextFactory _dbContextFactory;

//        // Constructor
//        public CityRepository(DbContextFactory dbContextFactory)
//        {
//            _dbContextFactory = dbContextFactory;
//        }

//        // Public methods
//        public List<T_city> GetAllCities()
//        {
//            using (var customerEntities = _dbContextFactory.CreateCustomerEntities())
//            {
//                return customerEntities.T_city.Select(city => city).ToList();
//            }
//        }
//    }
//}
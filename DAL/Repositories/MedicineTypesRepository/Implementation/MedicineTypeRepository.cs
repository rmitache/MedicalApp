

namespace DAL.Repositories.MedicineTypesRepository
{
    public class MedicineTypeRepository: IMedicineTypeRepository
    {
        public void WtfDude()
        {

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
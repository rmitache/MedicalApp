using DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Repositories.MedicineTypesRepository
{
    public interface IMedicineTypeRepository
    {
        List<t_medicine_type> GetAllMedicineTypes();
    }
}

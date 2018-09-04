using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories
{
    public interface IPlanRepository
    {
        List<TPlan> GetPlans(int userID, bool includeRules );
        TPlan AddPlan(TPlan plan);
        void RenamePlan(int planID, string newName, int userID);
    }
}

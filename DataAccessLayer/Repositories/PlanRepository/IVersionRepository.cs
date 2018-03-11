using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.PlanRepository
{
    public interface IVersionRepository
    {
        TPlanVersion AddVersion(TPlanVersion version, int planID);
        TPlanVersion UpdateVersion(TPlanVersion version, int planID);
    }
}

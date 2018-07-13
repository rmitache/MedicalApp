using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Plans.Factories
{
    public interface IVersionFactory
    {
        TPlanVersion Convert_ToDataEntity(BLOs.Version blo);
        List<TPlanVersion> Convert_ToDataEntitiesList(List<BLOs.Version> blos);
        BLOs.Version Convert_ToBLO(TPlanVersion dataEntity);
        List<BLOs.Version> Convert_ToBLOList(List<TPlanVersion> dataEntities);
    }
}

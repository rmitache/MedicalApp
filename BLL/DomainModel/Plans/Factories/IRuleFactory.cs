using BLL.DomainModel.Plans.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Plans.Factories
{
    public interface IRuleFactory
    {
        TPlanRule Convert_ToDataEntity(Rule blo);
        List<TPlanRule> Convert_ToDataEntitiesList(List<Rule> blos);
        Rule Convert_ToBLO(TPlanRule dataEntity);
        List<Rule> Convert_ToBLOList(List<TPlanRule> dataEntities);
    }
}

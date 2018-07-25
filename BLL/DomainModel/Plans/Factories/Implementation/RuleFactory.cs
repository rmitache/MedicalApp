using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Enums;
using Common.DataStructures;
using BLL.DomainModel.Factors.Medicine.Factories;

namespace BLL.DomainModel.Plans.Factories
{
    public class RuleFactory : IRuleFactory
    {
        // Fields
        private readonly IMedicineRuleItemFactory medicineRuleItemFactory;

        // Constructor
        public RuleFactory(IMedicineRuleItemFactory medicineRuleItemFactory)
        {
            this.medicineRuleItemFactory = medicineRuleItemFactory;

        }

        // Public methods
        public TPlanRule Convert_ToDataEntity(Rule blo)
        {
            TPlanRule dataEntity = new TPlanRule();
            dataEntity.Id = blo.ID;
            dataEntity.OrdinalFrequencyTypeId = (int)blo.OrdinalFrequencyType;
            dataEntity.FrequencyTypeId = (int)blo.FrequencyType;
            dataEntity.DaysInWeek = blo.DaysInWeek.ToCommaSeparatedString();
            dataEntity.MomentsInDay = Time.ToCommaSeparatedString(blo.MomentsInDay);
            dataEntity.TPlanMedicineRuleItem = this.medicineRuleItemFactory.Convert_ToDataEntitiesList(blo.MedicineRuleItems);

            return dataEntity;
        }
        public List<TPlanRule> Convert_ToDataEntitiesList(List<Rule> blos)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo)).ToList();
            return dataEntitiesList;
        }
        public Rule Convert_ToBLO(TPlanRule dataEntity)
        {
            Rule blo = new Rule();
            blo.ID = dataEntity.Id;
            blo.OrdinalFrequencyType = (OrdinalFrequencyType) dataEntity.OrdinalFrequencyTypeId;
            blo.FrequencyType = (RuleFrequencyType)dataEntity.FrequencyTypeId;
            blo.DaysInWeek = DaysInWeek.ParseCommaSeparatedString(dataEntity.DaysInWeek);
            blo.MomentsInDay = Time.ParseCommaSeparatedString(dataEntity.MomentsInDay);
            blo.MedicineRuleItems = this.medicineRuleItemFactory.Convert_ToBLOList(dataEntity.TPlanMedicineRuleItem.ToList());

            return blo;
        }
        public List<Rule> Convert_ToBLOList(List<TPlanRule> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }

       
    }
}

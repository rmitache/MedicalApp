using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.Plans.BLOs;
using Common.Datastructures;
using System;
using BLL.DomainModel.Plans.Enums;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net;

namespace BLL.DomainModel.Factors.Medicine.History.Factories
{
    public class MedicineFactorRecordFactory : IMedicineFactorRecordFactory
    {
        // Fields
        private readonly IMedicineTypeFactory medicineTypeFactory;

        // Private methods
        private List<DateTime> getRuleHitPattern(Rule rule, DateTime versionStartDate, DateTime minDate, DateTime maxDate)
        {
            // Variables
            List<DateTime> dates = null;
            CalendarEvent eventObj = new CalendarEvent
            {
                Start = new CalDateTime(versionStartDate),
                Duration = new TimeSpan(0,10,0),
                RecurrenceRules = new List<RecurrencePattern>()
            };
            int everyX = (int)rule.OrdinalFrequencyType + 1;

            // Daily frequency
            if (rule.FrequencyType == RuleFrequencyType.Daily)
            {
                eventObj.RecurrenceRules.Add(new RecurrencePattern()
                {
                    Frequency = FrequencyType.Daily,
                    Interval = everyX,
                    FirstDayOfWeek = DayOfWeek.Monday
                });
            }
            else
            // Weekly
            {
                var x = rule.DaysInWeek.ToICalWeekDayList();
                eventObj.RecurrenceRules.Add(new RecurrencePattern()
                {
                    Frequency = FrequencyType.Weekly,
                    Interval = everyX,
                    FirstDayOfWeek = DayOfWeek.Monday,
                    ByDay= rule.DaysInWeek.ToICalWeekDayList()

                });
            }

            //
            dates = eventObj.GetOccurrences(minDate, maxDate).Select(occurence => occurence.Period.StartTime.Date).ToList();
            return dates;
        }
        private MedicineFactorRecord createFromMedicineRuleItem(MedicineRuleItem ruleItem, DateTime occurrenceDateTime)
        {
            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.ID = -1;
            blo.Type = MedicineFactorRecordType.PlanProjection;
            blo.MedicineType = ruleItem.MedicineType;
            blo.OccurenceDateTime = occurrenceDateTime;

            blo.UnitDoseQuantifier = ruleItem.UnitDoseQuantifier;
            blo.UnitDoseType = ruleItem.UnitDoseType;
            blo.UnitDoseSize = ruleItem.UnitDoseSize;
            blo.UnitDoseUoM = ruleItem.UnitDoseUoM;

            blo.Instruction = ruleItem.Instruction;


            return blo;
        }

        // Constructor
        public MedicineFactorRecordFactory(IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public TMedicineFactorRecord Convert_ToDataEntity(MedicineFactorRecord blo, int userID)
        {
            TMedicineFactorRecord dataEntity = new TMedicineFactorRecord();
            dataEntity.Id = blo.ID;
            dataEntity.UserId = userID;
            dataEntity.MedicineTypeId = blo.MedicineType.ID;
            dataEntity.OccurrenceDateTime = blo.OccurenceDateTime;

            dataEntity.UnitDoseQuantifier = blo.UnitDoseQuantifier;
            dataEntity.UnitDoseTypeId = (int)blo.UnitDoseType;
            dataEntity.UnitDoseSize = blo.UnitDoseSize;
            dataEntity.UnitDoseUomId = (int)blo.UnitDoseUoM;

            dataEntity.InstructionId = (int)blo.Instruction;
            dataEntity.AdministrationMethodId = (int)blo.AdministrationMethod;
            return dataEntity;
        }
        public List<TMedicineFactorRecord> Convert_ToDataEntitiesList(List<MedicineFactorRecord> blos, int userID)
        {
            var dataEntitiesList = blos.Select(blo => Convert_ToDataEntity(blo, userID)).ToList();
            return dataEntitiesList;
        }
        public MedicineFactorRecord Convert_ToBLO(TMedicineFactorRecord dataEntity)
        {
            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.ID = dataEntity.Id;
            blo.Type = MedicineFactorRecordType.UserEntry;
            blo.MedicineType = this.medicineTypeFactory.Convert_ToBLO(dataEntity.MedicineType);
            blo.OccurenceDateTime = dataEntity.OccurrenceDateTime;

            blo.UnitDoseQuantifier = dataEntity.UnitDoseQuantifier;
            blo.UnitDoseType = (UnitDoseType)dataEntity.UnitDoseTypeId;
            blo.UnitDoseSize = (int)dataEntity.UnitDoseSize;
            blo.UnitDoseUoM = (UnitOfMeasure)dataEntity.UnitDoseUomId;

            blo.Instruction = (Instruction)dataEntity.InstructionId;


            return blo;
        }
        public List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime windowStartDate, DateTime windowEndDate)
        {
            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plan plan in planBLOs)
            {
                foreach (Plans.BLOs.Version version in plan.Versions)
                {
                    // Prepare range dates
                    DateTime minDate = (version.StartDate > windowStartDate) ? version.StartDate : windowStartDate;
                    DateTime maxDate;
                    if (version.EndDate == null)
                    {
                        maxDate = windowEndDate;
                    }
                    else
                    {
                        maxDate = (version.EndDate < windowEndDate) ? ((DateTime)version.EndDate).Add(new TimeSpan(0, 23, 59, 59)) : windowEndDate;
                    }

                    // Create MedicineItems for each Rule
                    foreach (Rule rule in version.Rules)
                    {
                        var hitDates = getRuleHitPattern(rule, version.StartDate, minDate, maxDate);
                        foreach (DateTime hitDate in hitDates)
                        {
                            foreach (Time time in rule.MomentsInDay)
                            {
                                var occurrenceDateTime = new DateTime(hitDate.Year, hitDate.Month, hitDate.Day,
                                    time.Hours, time.Minutes, 0);
                                foreach (MedicineRuleItem ruleItem in rule.MedicineRuleItems)
                                {
                                    var newFactorRecord = createFromMedicineRuleItem(ruleItem, occurrenceDateTime);
                                    projectedFactorRecordsList.Add(newFactorRecord);
                                }
                            }
                        }

                    }


                }

            }


            return projectedFactorRecordsList;
        }
        public List<MedicineFactorRecord> Convert_ToBLOList(List<TMedicineFactorRecord> dataEntities)
        {
            var blosList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return blosList;
        }
    }
}

using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Plans.BLOs;
using Common.DataStructures;
using System;
using BLL.DomainModel.Plans.Enums;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net;
using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Enums;

namespace BLL.DomainModel.Factors.Medicine.Factories
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
                Duration = new TimeSpan(0, 10, 0),
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
                    ByDay = rule.DaysInWeek.ToICalWeekDayList()

                });
            }

            //
            dates = eventObj.GetOccurrences(minDate, maxDate).Select(occurrence => occurrence.Period.StartTime.Date).ToList();
            return dates;
        }
        private Dictionary<string, MedicineType> GetUniqueMedicineTypesInVersion(Plans.BLOs.Version version)
        {
            var dict = new Dictionary<string, MedicineType>();

            // Loop through rules
            foreach (Rule rule in version.Rules)
            {

                // Loop through ruleItems
                foreach (MedicineRuleItem ruleItem in rule.MedicineRuleItems)
                {
                    if (!dict.ContainsKey(ruleItem.MedicineType.Name))
                    {
                        dict[ruleItem.MedicineType.Name] = ruleItem.MedicineType;
                    }
                }
            }

            return dict;
        }


        private MedicineFactorRecord createFactorRecordFromMedicineRuleItem(
            MedicineRuleItem ruleItem,
            DateTime occurrenceDateTime,
            Plan parentPlan,
            bool recentlyAdded)
        {
            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.MedicineType = ruleItem.MedicineType;
            blo.OccurrenceDateTime = occurrenceDateTime;

            blo.ParentPlanName = parentPlan.Name;
            blo.ParentPlanID = parentPlan.ID;
            blo.RecentlyAdded = recentlyAdded;

            blo.UnitDoseQuantifier = ruleItem.UnitDoseQuantifier;
            blo.HasUserDefinedUnitDose = ruleItem.HasUserDefinedUnitDose;
            blo.UserDefinedUnitDoseType = ruleItem.UserDefinedUnitDoseType;
            blo.UserDefinedUnitDoseSize = ruleItem.UserDefinedUnitDoseSize;

            

            return blo;
        }

        // Constructor
        public MedicineFactorRecordFactory(IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime windowStartDate, DateTime windowEndDate)
        {
            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plan plan in planBLOs)
            {
                for (int i = 0; i < plan.Versions.Count; i++)
                {
                    var version = plan.Versions[i];

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


                    // Create FactorRecords for each Rule
                    foreach (Rule rule in version.Rules)
                    {
                        var hitDates = getRuleHitPattern(rule, plan.GetFirstVersion().StartDate, minDate, maxDate);
                        foreach (DateTime hitDate in hitDates)
                        {
                            foreach (Time time in rule.MomentsInDay)
                            {
                                var occurrenceDateTime = new DateTime(hitDate.Year, hitDate.Month, hitDate.Day,
                                    time.Hours, time.Minutes, 0);
                                foreach (MedicineRuleItem ruleItem in rule.MedicineRuleItems)
                                {
                                    //
                                    bool recentlyAdded = false;
                                    if (version.ID == plan.GetLatestVersion().ID)
                                    {
                                        var previousVersion = plan.GetPreviousLatestVersion();
                                        var medTypesInPrevVersion = (previousVersion != null) ? this.GetUniqueMedicineTypesInVersion(previousVersion) : null;
                                        recentlyAdded = (previousVersion == null || !medTypesInPrevVersion.ContainsKey(ruleItem.MedicineType.Name)) && version.RecentlyStarted();
                                    }

                                    //
                                    var newFactorRecord = createFactorRecordFromMedicineRuleItem(ruleItem, occurrenceDateTime, plan, recentlyAdded);
                                    projectedFactorRecordsList.Add(newFactorRecord);
                                }
                            }
                        }

                    }


                }

            }


            return projectedFactorRecordsList;
        }

    }
}

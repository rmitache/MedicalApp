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
using Common;

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
        private MedicineFactorRecord createFactorRecordFromMedicineRuleItem(MedicineRuleItem ruleItem, DateTime occurrenceDate,
            Time occurrenceTime, Plan parentPlan, bool recentlyAdded)
        {
            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.MedicineType = ruleItem.MedicineType;
            blo.OccurrenceDate = occurrenceDate;
            blo.OccurrenceTime = occurrenceTime;

            blo.ParentPlanName = parentPlan.Name;
            blo.ParentPlanID = parentPlan.ID;
            blo.MedicineRuleItemID = ruleItem.ID;
            blo.RecentlyAdded = recentlyAdded;

            blo.UnitDoseQuantifier = ruleItem.UnitDoseQuantifier;
            blo.HasUserDefinedUnitDose = ruleItem.HasUserDefinedUnitDose;
            blo.UserDefinedUnitDoseType = ruleItem.UserDefinedUnitDoseType;
            blo.UserDefinedUnitDoseSize = ruleItem.UserDefinedUnitDoseSize;



            return blo;
        }
        private DateTime ConvertDateTimeUsingOffset(DateTime utcDateTime, int utcOffsetInMins)
        {
            if (utcDateTime.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("utcDateTime");
            }
            if(utcDateTime==null)
            {
                throw new ArgumentNullException("utcDateTime");
            }



            // Convert start date
            var localDateTime = utcDateTime.AddMinutes(-utcOffsetInMins);
            localDateTime = DateTime.SpecifyKind(localDateTime, DateTimeKind.Local);


            return localDateTime;
        }

        // Constructor
        public MedicineFactorRecordFactory(IMedicineTypeFactory medicineTypeFactory)
        {
            this.medicineTypeFactory = medicineTypeFactory;
        }

        // Public methods
        public List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime windowStartDate, 
            DateTime windowEndDate, int utcOffsetInMins)
        {
            if (windowStartDate.Kind != DateTimeKind.Utc ||
               windowEndDate.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("Window startDates but be given in UTC");
            }

            // Convert range to local datetime
            windowStartDate = this.ConvertDateTimeUsingOffset(windowStartDate, utcOffsetInMins);
            windowEndDate = this.ConvertDateTimeUsingOffset(windowEndDate, utcOffsetInMins);


            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plan plan in planBLOs)
            {
                for (int i = 0; i < plan.Versions.Count; i++)
                {
                    var version = plan.Versions[i];

                    // Prepare range dates
                    var versionStartDateInClientTime = this.ConvertDateTimeUsingOffset(version.StartDateTime, utcOffsetInMins);
                    DateTime minDate = (versionStartDateInClientTime > windowStartDate) ? versionStartDateInClientTime : windowStartDate;
                    DateTime maxDate;
                    if (version.EndDateTime == null)
                    {
                        maxDate = windowEndDate;
                    }
                    else
                    {
                        var versionEndDateInClientTime = this.ConvertDateTimeUsingOffset((DateTime)version.EndDateTime, utcOffsetInMins);
                        maxDate = (versionEndDateInClientTime < windowEndDate) ? (versionEndDateInClientTime) : windowEndDate;
                    }


                    // Create FactorRecords for each Rule
                    foreach (Rule rule in version.Rules)
                    {
                        var hitDates = getRuleHitPattern(rule, version.StartDateTime, minDate, maxDate);
                        foreach (DateTime hitDate in hitDates)
                        {
                            foreach (Time time in rule.MomentsInDay)
                            {
                                foreach (MedicineRuleItem ruleItem in rule.MedicineRuleItems)
                                {
                                    //
                                    bool recentlyAdded = false;
                                    if (version.ID == plan.GetLatestVersion().ID)
                                    {
                                        var previousVersion = plan.GetPreviousLatestVersion();
                                        var medTypesInPrevVersion = (previousVersion != null) ? previousVersion.GetUniqueMedicineTypes() : null;
                                        recentlyAdded = (previousVersion == null || !medTypesInPrevVersion.ContainsKey(ruleItem.MedicineType.Name)) && version.RecentlyStarted();
                                    }

                                    //
                                    var newFactorRecord = createFactorRecordFromMedicineRuleItem(ruleItem, hitDate, time, plan, recentlyAdded);
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

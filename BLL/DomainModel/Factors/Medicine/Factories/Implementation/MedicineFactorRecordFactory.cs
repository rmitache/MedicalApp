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
using BLL.DomainModel.Factors.Medicine.Factories.Implementation;

namespace BLL.DomainModel.Factors.Medicine.Factories
{
    public class MedicineFactorRecordFactory : IMedicineFactorRecordFactory
    {
        // Fields
        private readonly IMedicineTypeFactory medicineTypeFactory;
        private readonly IRuleHitPatternService ruleHitPatternService;

        // Private methods
        private MedicineFactorRecord createFactorRecordFromMedicineRuleItem(MedicineRuleItem ruleItem, DateTime localOccurrenceDate,
            Time occurrenceTime, Plan parentPlan, bool recentlyAdded)
        {
            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.MedicineType = ruleItem.MedicineType;
            blo.OccurrenceDate = localOccurrenceDate;
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
        private DateTime convertDateTimeUsingOffset(DateTime utcDateTime, int utcOffsetInMins)
        {
            if (utcDateTime.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("utcDateTime");
            }
            if (utcDateTime == null)
            {
                throw new ArgumentNullException("utcDateTime");
            }



            // Convert start date
            var localDateTime = utcDateTime.AddMinutes(-utcOffsetInMins);
            localDateTime = DateTime.SpecifyKind(localDateTime, DateTimeKind.Local);


            return localDateTime;
        }

        // Constructor
        public MedicineFactorRecordFactory(IMedicineTypeFactory medicineTypeFactory,
            IRuleHitPatternService ruleHitPatternService)
        {
            this.medicineTypeFactory = medicineTypeFactory;
            this.ruleHitPatternService = ruleHitPatternService;
        }

        // Public methods
        public List<MedicineFactorRecord> Create_FromSinglePlan(Plan plan, DateTime localWindowStartDateTime, DateTime localWindowEndDateTime, int utcOffsetInMins)
        {
            if (localWindowStartDateTime.Kind != DateTimeKind.Local || localWindowEndDateTime.Kind != DateTimeKind.Local)
            {
                throw new ArgumentException("Window startDates must be given in UTC");
            }

           

            // Loop through Versions and generate MedicineFactorRecords
            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plans.BLOs.Version version in plan.Versions)
            {
                // Get version start/end dates in local time 
                DateTime localVersionStartDateTime = this.convertDateTimeUsingOffset(version.StartDateTime, utcOffsetInMins);
                DateTime? localVersionEndDateTime = (version.EndDateTime == null) ? null :
                    (DateTime?)this.convertDateTimeUsingOffset((DateTime)version.EndDateTime, utcOffsetInMins);

                // Determine the min and max dates to be used for the projection (in local time)
                DateTime localMinDate = (localVersionStartDateTime > localWindowStartDateTime) ? localVersionStartDateTime : localWindowStartDateTime;
                DateTime localMaxDate;
                if (version.EndDateTime == null)
                    localMaxDate = localWindowEndDateTime;
                else
                    localMaxDate = (localVersionEndDateTime < localWindowEndDateTime) ? (DateTime)localVersionEndDateTime : localWindowEndDateTime;


                // Create FactorRecords for each Rule
                foreach (Rule rule in version.Rules)
                {
                    var localHitDates = this.ruleHitPatternService.GetRuleHitPattern(rule, localVersionStartDateTime, localMinDate, localMaxDate);

                    // For each hitdate, create FactorRecords
                    foreach (DateTime localHitDate in localHitDates)
                    {
                        foreach (Time localTime in rule.MomentsInDay)
                        {
                            foreach (MedicineRuleItem ruleItem in rule.MedicineRuleItems)
                            {
                                //
                                bool recentlyAdded = false;
                                if (version.ID == plan.GetLatestVersion().ID) // if it is the latest version, try to highlight recently added FactorRecords
                                {
                                    var previousVersion = plan.GetPreviousLatestVersion();
                                    var medTypesInPrevVersion = (previousVersion != null) ? previousVersion.GetUniqueMedicineTypes() : null;
                                    recentlyAdded = (previousVersion == null || !medTypesInPrevVersion.ContainsKey(ruleItem.MedicineType.Name)) && version.RecentlyStarted();
                                }

                                //
                                var localOccurrenceDateTime = localHitDate.StartOfDay().AddHours(localTime.Hours).AddMinutes(localTime.Minutes);
                                var newFactorRecord = createFactorRecordFromMedicineRuleItem(ruleItem, localHitDate, localTime, plan, recentlyAdded);
                                projectedFactorRecordsList.Add(newFactorRecord);
                            }
                        }
                    }

                }


            }


            return projectedFactorRecordsList;
        }
        public List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime utcWindowStartDate,
            DateTime utcWindowEndDate, int utcOffsetInMins)
        {
            if (utcWindowStartDate.Kind != DateTimeKind.Utc || utcWindowEndDate.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("Window startDates must be given in UTC");
            }

            // Convert window to local time
            var localWindowStartDateTime = this.convertDateTimeUsingOffset(utcWindowStartDate, utcOffsetInMins);
            var localWindowEndDateTime = this.convertDateTimeUsingOffset(utcWindowEndDate, utcOffsetInMins);


            // Loop through all versions and create FactorRecords
            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plan plan in planBLOs)
            {
                var factorRecordsFromPlan = this.Create_FromSinglePlan(plan, localWindowStartDateTime, localWindowEndDateTime, utcOffsetInMins);
                projectedFactorRecordsList.AddRange(factorRecordsFromPlan);
            }


            return projectedFactorRecordsList;
        }

    }
}

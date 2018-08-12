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
        private MedicineFactorRecord createFactorRecordFromMedicineRuleItem(MedicineRuleItem ruleItem, DateTime utcOccurrenceDateTime,
             Plan parentPlan, bool recentlyAdded)
        {
            if (utcOccurrenceDateTime.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("utcOccurrenceDateTime must be of UTC kind");
            }

            MedicineFactorRecord blo = new MedicineFactorRecord();
            blo.MedicineType = ruleItem.MedicineType;
            blo.OccurrenceDateTime = utcOccurrenceDateTime;

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



        // Constructor
        public MedicineFactorRecordFactory(IMedicineTypeFactory medicineTypeFactory,
            IRuleHitPatternService ruleHitPatternService)
        {
            this.medicineTypeFactory = medicineTypeFactory;
            this.ruleHitPatternService = ruleHitPatternService;
        }

        // Public methods
        public List<MedicineFactorRecord> Create_FromSinglePlan(Plan plan, DateTime utcWindowStartDateTime, DateTime utcWindowEndDateTime, int utcOffsetInMins)
        {
            if (utcWindowStartDateTime.Kind != DateTimeKind.Utc || utcWindowEndDateTime.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("Window startDates must be given in UTC");
            }

            // Convert window to local time
            Range<DateTime> localWindowRange = new Range<DateTime>(Functions.ConvertToLocalDateTime(utcWindowStartDateTime, utcOffsetInMins),
                Functions.ConvertToLocalDateTime(utcWindowEndDateTime, utcOffsetInMins));

            // Loop through Versions and generate MedicineFactorRecords
            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plans.BLOs.Version version in plan.Versions)
            {
                // Get the version startDate and endDate as Local time
                DateTime localVersionStartDateTime = Functions.ConvertToLocalDateTime(version.StartDateTime, utcOffsetInMins);
                DateTime? localVersionEndDateTime = null;
                if (version.EndDateTime != null)
                    localVersionEndDateTime = Functions.ConvertToLocalDateTime((DateTime)version.EndDateTime, utcOffsetInMins);

                // Create FactorRecords for each Rule
                foreach (Rule rule in version.Rules)
                {
                    var localHitDatesTimesForRule = this.ruleHitPatternService.GetRuleDateTimeHitsPattern(rule, localVersionStartDateTime,localVersionEndDateTime,
                        localWindowRange);


                    foreach (DateTime localHitDateTime in localHitDatesTimesForRule)
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
                            var utcOccurrenceDateTime = Functions.ConvertToUTCDateTime(localHitDateTime, utcOffsetInMins);
                            var newFactorRecord = createFactorRecordFromMedicineRuleItem(ruleItem, utcOccurrenceDateTime, plan, recentlyAdded);
                            projectedFactorRecordsList.Add(newFactorRecord);
                        }
                    }

                }


            }


            return projectedFactorRecordsList;
        }
        public List<MedicineFactorRecord> Create_FromMedicinePlans(List<Plan> planBLOs, DateTime utcWindowStartDateTime,
            DateTime utcWindowEndDateTime, int utcOffsetInMins)
        {
            if (utcWindowStartDateTime.Kind != DateTimeKind.Utc || utcWindowEndDateTime.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("Window startDates must be given in UTC");
            }


            // Loop through all versions and create FactorRecords
            var projectedFactorRecordsList = new List<MedicineFactorRecord>();
            foreach (Plan plan in planBLOs)
            {
                var factorRecordsFromPlan = this.Create_FromSinglePlan(plan, utcWindowStartDateTime, utcWindowEndDateTime, utcOffsetInMins);
                projectedFactorRecordsList.AddRange(factorRecordsFromPlan);
            }

            return projectedFactorRecordsList;
        }

    }
}

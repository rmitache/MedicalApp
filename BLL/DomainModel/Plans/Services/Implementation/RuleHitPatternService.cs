using BLL.DomainModel.Factors.Medicine.Factories.Implementation;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Enums;
using Common.DataStructures;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.DomainModel.Plans.Services
{
    public class RuleHitPatternService : IRuleHitPatternService
    {
        // Private methods
        private List<DateTime> GetDateTimeHitsForMomentInDay(Time momentInDay, DateTime localVersionStartDate, DateTime? localVersionEndDate,
            DateTime localWindowStartDate, DateTime localWindowEndDate,
            OrdinalFrequencyType ordinalFrequencyType, RuleFrequencyType frequencyType, DaysInWeek daysInWeek)
        {
            // Create the Event
            CalendarEvent eventObj = new CalendarEvent
            {
                Start = new CalDateTime(localVersionStartDate).AddHours(momentInDay.Hours).AddMinutes(momentInDay.Minutes),
                Duration = new TimeSpan(0, 10, 0),
                RecurrenceRules = new List<RecurrencePattern>()
            };
            int everyX = (int)ordinalFrequencyType + 1;


            // Setup the recurrence settings
            if (frequencyType == RuleFrequencyType.Daily)
            {
                // Daily frequency
                eventObj.RecurrenceRules.Add(new RecurrencePattern()
                {
                    Frequency = FrequencyType.Daily,
                    Interval = everyX,
                    FirstDayOfWeek = DayOfWeek.Monday,
                });
            }
            else
            {
                // Weekly
                eventObj.RecurrenceRules.Add(new RecurrencePattern()
                {
                    Frequency = FrequencyType.Weekly,
                    Interval = everyX,
                    FirstDayOfWeek = DayOfWeek.Monday,
                    ByDay = daysInWeek.ToICalWeekDayList(),
                });
            }

            // Determine projection bounds
            DateTime localMinDate = (localVersionStartDate > localWindowStartDate) ? localVersionStartDate : localWindowStartDate;
            DateTime localMaxDate = localWindowEndDate;
            if (localVersionEndDate != null)
            {
                localMaxDate = (localVersionEndDate < localWindowEndDate) ? (DateTime)localVersionEndDate : localWindowEndDate;
            }


            //
            var localDateTimeHits = eventObj.GetOccurrences(localMinDate, localMaxDate).Select(occurrence => occurrence.Period.StartTime.Value).ToList();
            localDateTimeHits = localDateTimeHits.Select(date => date = DateTime.SpecifyKind(date, DateTimeKind.Utc)).ToList();
            return localDateTimeHits;
        }

        // Constructor
        public RuleHitPatternService()
        {

        }

        // Public methods
        public List<DateTime> GetRuleDateTimeHitsPattern(Rule rule, DateTime utcVersionStartDateTime, DateTime? utcVersionEndDateTime,
            Range<DateTime> utcWindowRange)
        {
            if (utcVersionStartDateTime.Kind != DateTimeKind.Utc || (utcVersionEndDateTime != null && ((DateTime)utcVersionEndDateTime).Kind != DateTimeKind.Utc)
                || utcWindowRange.RangeStart.Kind != DateTimeKind.Utc || utcWindowRange.RangeEnd.Kind != DateTimeKind.Utc)
            {
                throw new ArgumentException("DateTime parameters must be of utc kind");
            }
            if (utcWindowRange.RangeStart > utcWindowRange.RangeEnd)
            {
                throw new ArgumentException("MinDate cannot be greater than MaxDate");
            }


            //
            List<DateTime> utcDateTimeHits = new List<DateTime>();
            foreach (Time time in rule.MomentsInDay)
            {
                var utcHitsForMoment = this.GetDateTimeHitsForMomentInDay(time, utcVersionStartDateTime, utcVersionEndDateTime,
                    utcWindowRange.RangeStart, utcWindowRange.RangeEnd,
                    rule.OrdinalFrequencyType, rule.FrequencyType, rule.DaysInWeek);
                utcDateTimeHits.AddRange(utcHitsForMoment);
            }

            utcDateTimeHits = utcDateTimeHits.OrderByDescending(date => date).Reverse().ToList();
            return utcDateTimeHits;
        }
    }

}

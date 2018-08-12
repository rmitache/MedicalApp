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
        private List<DateTime> GetDateTimeHitsForMomentInDay(Time momentInDay, DateTime localVersionStartDate, DateTime localMinDate, DateTime localMaxDate,
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

            //
            var localDateTimeHits = eventObj.GetOccurrences(localMinDate, localMaxDate).Select(occurrence => occurrence.Period.StartTime.Value).ToList();
            localDateTimeHits = localDateTimeHits.Select(date => date = DateTime.SpecifyKind(date, DateTimeKind.Local)).ToList();
            // QUESTION: filter first and last dates based on hours/minutes ? Why ? Ex: so if start date starts at 22:00, not to include Moments like 16:00
            return localDateTimeHits;
        }

        // Constructor
        public RuleHitPatternService()
        {

        }

        // Public methods
        public List<DateTime> GetRuleDateTimeHitsPattern(Rule rule, DateTime localVersionStartDate, DateTime localMinDate, DateTime localMaxDate)
        {
            if (localVersionStartDate.Kind != DateTimeKind.Local || localMinDate.Kind != DateTimeKind.Local
                || localMaxDate.Kind != DateTimeKind.Local)
            {
                throw new ArgumentException("DateTime parameters must be of Local kind");
            }
            if (localMinDate > localMaxDate)
            {
                throw new ArgumentException("MinDate cannot be greater than MaxDate");
            }


            //
            List<DateTime> localDateTimeHits = new List<DateTime>();
            foreach (Time time in rule.MomentsInDay)
            {
                var localHitsForMoment = this.GetDateTimeHitsForMomentInDay(time, localVersionStartDate, localMinDate, localMaxDate,
                    rule.OrdinalFrequencyType, rule.FrequencyType, rule.DaysInWeek);
                localDateTimeHits.AddRange(localHitsForMoment);
            }

            localDateTimeHits = localDateTimeHits.OrderByDescending(date => date).Reverse().ToList();
            return localDateTimeHits;
        }
    }

}

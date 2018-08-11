using BLL.DomainModel.Factors.Medicine.Factories.Implementation;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Enums;
using Ical.Net;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BLL.DomainModel.Plans.Services
{
    public class RuleHitPatternService: IRuleHitPatternService
    {
        public RuleHitPatternService()
        {

        }

        public List<DateTime> GetRuleHitPattern(Rule rule, DateTime localVersionStartDate, DateTime localMinDate, DateTime localMaxDate)
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


            // Variables
            List<DateTime> dates = null;
            CalendarEvent eventObj = new CalendarEvent
            {
                Start = new CalDateTime(localVersionStartDate),
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
            dates = eventObj.GetOccurrences(localMinDate, localMaxDate).Select(occurrence => occurrence.Period.StartTime.Date).ToList();
            return dates;
        }
    }

}

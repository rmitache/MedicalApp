using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories.Implementation;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Enums;
using BLL.DomainModel.Plans.Services;
using Common.DataStructures;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BLL.UnitTests.DomainModel.Factors
{
    public class RuleHitPatternTests
    {
        // Private methods
        private Mock<Rule> CreateRuleBLOMock(OrdinalFrequencyType ordinalFrequencyType, RuleFrequencyType frequencyType,
            DaysInWeek daysInWeek, List<Time> momentsInDay)
        {

            // Mock the BLO
            var newMock = new Mock<Rule>();
            newMock.SetupGet(mock => mock.ID).Returns(1);
            newMock.SetupGet(mock => mock.MedicineRuleItems).Returns((List<MedicineRuleItem>)null);
            newMock.SetupGet(mock => mock.MomentsInDay).Returns(momentsInDay);

            newMock.SetupGet(mock => mock.OrdinalFrequencyType).Returns(ordinalFrequencyType);
            newMock.SetupGet(mock => mock.FrequencyType).Returns(frequencyType);
            newMock.SetupGet(mock => mock.DaysInWeek).Returns(daysInWeek);

            return newMock;
        }
        private DateTime ParseDateTimeString(string str, DateTimeKind targetKind)
        {
            var dateTime = DateTime.Parse(str);
            dateTime = DateTime.SpecifyKind(dateTime, targetKind);

            return dateTime;
        }
        private DateTime? ParseNullableDateTimeString(string str, DateTimeKind targetKind)
        {
            if (str == null)
            {
                return null;
            }
            else
            {
                return ParseDateTimeString(str, targetKind);
            }
        }



        #region GetRuleHitPattern Tests

        [Theory]
        [InlineData("2018-12-20 22:00", null, "2018-12-01 22:00", "2018-12-31 21:59", "22:30")]
        [InlineData("2018-08-05 22:00", "2018-08-20 22:00", "2018-07-30 22:00", "2018-08-31 21:59", "22:30")]
        [InlineData("2018-12-20 22:00", "2018-12-25 21:59", "2018-12-01 22:00", "2018-12-31 21:59", "22:30")]
        public void GetRuleHitPattern_DailyFrequency_ReturnsCorrectHitDateTimes(string utcVersionStartDateStr, string utcVersionEndDateStr,
            string utcMinDateStr, string utcMaxDateStr, string momentsInDayStr)
        {
            // Arrange - prepare  parameters
            DateTime utcVersionStartDateTime = ParseDateTimeString(utcVersionStartDateStr, DateTimeKind.Utc);
            DateTime? utcVersionEndDateTime = ParseNullableDateTimeString(utcVersionEndDateStr, DateTimeKind.Utc);
            Range<DateTime> utcWindowRange = new Range<DateTime>(ParseDateTimeString(utcMinDateStr, DateTimeKind.Utc), 
                ParseDateTimeString(utcMaxDateStr, DateTimeKind.Utc));

            // Arrange - create RuleBLO
            IRuleHitPatternService service = new RuleHitPatternService();
            List<Time> momentsInDay = Time.ParseCommaSeparatedString(momentsInDayStr);
            var ruleMock = this.CreateRuleBLOMock(OrdinalFrequencyType.Every, RuleFrequencyType.Daily, new DaysInWeek(), momentsInDay);

            // Act
            var utcHitDateTimesForAllMomentsInRule = service.GetRuleDateTimeHitsPattern(ruleMock.Object, utcVersionStartDateTime, utcVersionEndDateTime,
                utcWindowRange);


            // Assert 
            DateTime minDateToUse = (utcVersionStartDateTime > utcWindowRange.RangeStart) ? utcVersionStartDateTime : utcWindowRange.RangeStart;
            DateTime maxDateToUse = utcWindowRange.RangeEnd;
            if (utcVersionEndDateTime != null)
            {
                maxDateToUse = (utcVersionEndDateTime < utcWindowRange.RangeEnd) ? (DateTime)utcVersionEndDateTime : utcWindowRange.RangeEnd;
            }
            var expectedNrOfHitDates = Math.Round(Math.Abs((maxDateToUse - minDateToUse).TotalDays) * momentsInDay.Count);
            Assert.Equal(DateTimeKind.Utc, utcHitDateTimesForAllMomentsInRule[0].Kind);
            Assert.Equal(expectedNrOfHitDates, utcHitDateTimesForAllMomentsInRule.Count);
        }

        [Theory]
        [InlineData("2018-08-05 22:00", "2018-08-20 21:59", "2018-07-30 22:00", "2018-08-31 21:59", "22:30", 3)]
        public void GetRuleHitPattern_WellFormedDateTimesWeeklyFrequency_ReturnsCorrectHitDateTimes(string utcVersionStartDateStr, string utcVersionEndDateStr,
            string utcMinDateStr, string utcMaxDateStr, string momentsInDayStr, int expectedNrOfHitDates)
        {

            // Arrange - prepare  parameters
            DateTime utcVersionStartDateTime = ParseDateTimeString(utcVersionStartDateStr, DateTimeKind.Utc);
            DateTime? utcVersionEndDateTime = ParseNullableDateTimeString(utcVersionEndDateStr, DateTimeKind.Utc);
            Range<DateTime> utcWindowRange = new Range<DateTime>(ParseDateTimeString(utcMinDateStr, DateTimeKind.Utc), 
                ParseDateTimeString(utcMaxDateStr, DateTimeKind.Utc));

            // Arrange - create RuleBLO
            IRuleHitPatternService service = new RuleHitPatternService();
            List<Time> momentsInDay = Time.ParseCommaSeparatedString(momentsInDayStr);
            var ruleMock = this.CreateRuleBLOMock(OrdinalFrequencyType.Every, RuleFrequencyType.Weekly, new DaysInWeek(new bool[] { true, false, false, false,
                false, false, false }), momentsInDay);

            // Act
            var localHitDateTimesForAllMomentsInRule = service.GetRuleDateTimeHitsPattern(ruleMock.Object, utcVersionStartDateTime, utcVersionEndDateTime,
                utcWindowRange);


            // Assert 
            DateTime minDateToUse = (utcVersionStartDateTime > utcWindowRange.RangeStart) ? utcVersionStartDateTime : utcWindowRange.RangeStart;
            DateTime maxDateToUse = utcWindowRange.RangeEnd;
            if (utcVersionEndDateTime != null)
            {
                maxDateToUse = (utcVersionEndDateTime < utcWindowRange.RangeEnd) ? (DateTime)utcVersionEndDateTime : utcWindowRange.RangeEnd;
            }
            Assert.Equal(DateTimeKind.Utc, localHitDateTimesForAllMomentsInRule[0].Kind);
            Assert.Equal(expectedNrOfHitDates, localHitDateTimesForAllMomentsInRule.Count);
        }



        #endregion

    }



}



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
        private DateTime ParseDateTimeStringAsLocal(string str)
        {
            var localDateTime = DateTime.Parse(str);
            localDateTime = DateTime.SpecifyKind(localDateTime, DateTimeKind.Local);

            return localDateTime;
        }


        #region GetRuleHitPattern Tests

        [Theory]
        [InlineData("2018-03-20 00:00", "2018-03-10 00:00", "2018-03-30 23:59", "10:45,15:30,19:25")]
        [InlineData("2018-03-19 22:00", "2018-03-09 22:00", "2018-03-30 21:59", "10:45,15:30,19:25")]
        [InlineData("2018-12-20 22:00", "2018-12-10 22:00", "2018-12-30 21:59", "22:30")]
        [InlineData("2018-12-20 22:00", "2018-07-10 22:00", "2018-12-30 21:59", "22:30")]
        public void GetRuleHitPattern_WellFormedDateTimesDailyFrequency_ReturnsCorrectHitDateTimes(string localVersionStartDateStr,
            string localMinDateStr, string localMaxDateStr, string momentsInDayStr)
        {

            // Arrange - create RuleBLO
            OrdinalFrequencyType ordinalFrequencyType = OrdinalFrequencyType.Every;
            RuleFrequencyType frequencyType = RuleFrequencyType.Daily;
            DaysInWeek daysInWeek = new DaysInWeek(new bool[] { true, true, true, true, true, true, true });
            List<Time> momentsInDay = Time.ParseCommaSeparatedString(momentsInDayStr);
            var ruleMock = this.CreateRuleBLOMock(ordinalFrequencyType, frequencyType, daysInWeek, momentsInDay);

            // Arrange - prepare other parameters
            DateTime localVersionStartDateTime = this.ParseDateTimeStringAsLocal(localVersionStartDateStr);
            DateTime localMinDateTime = this.ParseDateTimeStringAsLocal(localMinDateStr);
            DateTime localMaxDateTime = this.ParseDateTimeStringAsLocal(localMaxDateStr);
            IRuleHitPatternService service = new RuleHitPatternService();


            // Act
            var localHitDateTimesForAllMomentsInRule = service.GetRuleDateTimeHitsPattern(ruleMock.Object, localVersionStartDateTime, localMinDateTime, localMaxDateTime);


            // Assert 
            var minDateToUse = (localVersionStartDateTime > localMinDateTime) ? localVersionStartDateTime : localMinDateTime;
            var expectedNrOfHitDates = Math.Round(Math.Abs((localMaxDateTime - minDateToUse).TotalDays) * momentsInDay.Count);
            Assert.Equal(DateTimeKind.Local, localHitDateTimesForAllMomentsInRule[0].Kind);
            Assert.Equal(expectedNrOfHitDates, localHitDateTimesForAllMomentsInRule.Count);
        }

        [Theory]
        [InlineData("2018-12-07 22:00", "2018-12-10 22:00", "2018-12-30 21:59", "22:30", 1)]
        public void GetRuleHitPattern_WellFormedDateTimesWeeklyFrequency_ReturnsCorrectHitDateTimes(string localVersionStartDateStr,
            string localMinDateStr, string localMaxDateStr, string momentsInDayStr, int expectedNrOfHitDates)
        {

            // Arrange - create RuleBLO
            OrdinalFrequencyType ordinalFrequencyType = OrdinalFrequencyType.Every2nd;
            RuleFrequencyType frequencyType = RuleFrequencyType.Weekly;
            DaysInWeek daysInWeek = new DaysInWeek(new bool[] { true, false, false, false, false, false , false  });
            List<Time> momentsInDay = Time.ParseCommaSeparatedString(momentsInDayStr);
            var ruleMock = this.CreateRuleBLOMock(ordinalFrequencyType, frequencyType, daysInWeek, momentsInDay);

            // Arrange - prepare other parameters
            DateTime localVersionStartDateTime = this.ParseDateTimeStringAsLocal(localVersionStartDateStr);
            DateTime localMinDateTime = this.ParseDateTimeStringAsLocal(localMinDateStr);
            DateTime localMaxDateTime = this.ParseDateTimeStringAsLocal(localMaxDateStr);
            IRuleHitPatternService service = new RuleHitPatternService();


            // Act
            var localHitDateTimesForAllMomentsInRule = service.GetRuleDateTimeHitsPattern(ruleMock.Object, localVersionStartDateTime, localMinDateTime, localMaxDateTime);


            // Assert 
            Assert.Equal(expectedNrOfHitDates, localHitDateTimesForAllMomentsInRule.Count);
        }

        [Theory]
        [InlineData("2018-03-01 00:00", "2018-03-01 00:00", "2018-03-31 23:59")]
        public void GetRuleHitPattern_UTCDates_ThrowsException(string localVersionStartDateStr,
            string localMinDateStr, string localMaxDateStr)
        {

            // Arrange - create RuleBLO
            OrdinalFrequencyType ordinalFrequencyType = OrdinalFrequencyType.Every;
            RuleFrequencyType frequencyType = RuleFrequencyType.Daily;
            DaysInWeek daysInWeek = new DaysInWeek(new bool[] { true, true, true, true, true, true, true });
            List<Time> momentsInDay = Time.ParseCommaSeparatedString("10:45,15:30,19:25");
            var ruleMock = this.CreateRuleBLOMock(ordinalFrequencyType, frequencyType, daysInWeek, momentsInDay);

            // Arrange - prepare other parameters
            DateTime versionStartDateTime = DateTime.Parse(localVersionStartDateStr);
            DateTime minDateTime = DateTime.Parse(localMinDateStr);
            DateTime maxDateTime = DateTime.Parse(localMaxDateStr);


            // Act and Assert
            IRuleHitPatternService service = new RuleHitPatternService();
            Assert.Throws<ArgumentException>(() => service.GetRuleDateTimeHitsPattern(ruleMock.Object, versionStartDateTime, minDateTime, maxDateTime));
        }


        #endregion

    }
}

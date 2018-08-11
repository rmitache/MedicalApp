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
            DaysInWeek daysInWeek)
        {

            // Mock the BLO
            var newMock = new Mock<Rule>();
            newMock.SetupGet(mock => mock.ID).Returns(1);
            newMock.SetupGet(mock => mock.MedicineRuleItems).Returns((List<MedicineRuleItem>)null);
            newMock.SetupGet(mock => mock.MomentsInDay).Returns(Time.ParseCommaSeparatedString("10:45,15:30,19:25"));

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
        [InlineData("2011-03-20 00:00", "2011-03-10 00:00", "2011-03-30 23:59")]
        public void GetRuleHitPattern_DailyFrequency_ReturnsCorrectCountOfHitDates(string localVersionStartDateStr,
            string localMinDateStr, string localMaxDateStr)
        {

            // Arrange - create RuleBLO
            OrdinalFrequencyType ordinalFrequencyType = OrdinalFrequencyType.Every;
            RuleFrequencyType frequencyType = RuleFrequencyType.Daily;
            DaysInWeek daysInWeek = new DaysInWeek(new bool[] { true, true, true, true, true, true, true });
            var ruleMock = this.CreateRuleBLOMock(ordinalFrequencyType, frequencyType, daysInWeek);

            // Arrange - prepare other parameters
            DateTime localVersionStartDateTime = this.ParseDateTimeStringAsLocal(localVersionStartDateStr);
            DateTime localMinDateTime = this.ParseDateTimeStringAsLocal(localMinDateStr);
            DateTime localMaxDateTime = this.ParseDateTimeStringAsLocal(localMaxDateStr);
            

            // Act
            IRuleHitPatternService service = new RuleHitPatternService();
            var localHitDates = service.GetRuleHitPattern(ruleMock.Object, localVersionStartDateTime, localMinDateTime, localMaxDateTime);


            // Assert 
            var minDateToUse = (localVersionStartDateTime > localMinDateTime) ? localVersionStartDateTime : localMinDateTime;
            var expectedNrOfHitDates = Math.Round(Math.Abs((localMaxDateTime - minDateToUse).TotalDays));
            Assert.Equal(expectedNrOfHitDates, localHitDates.Count);
        }


        #endregion

    }
}

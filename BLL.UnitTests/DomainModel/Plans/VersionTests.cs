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
using FluentAssertions;

namespace BLL.UnitTests.DomainModel.Factors
{
    public class VersionTests
    {
        // Private methods
        private Mock<BLL.DomainModel.Plans.BLOs.Version> CreateVersionBLOMockWithoutRules(DateTime startDateTime, DateTime? endDateTime)
        {

            // Mock the BLO
            var newMock = new Mock<BLL.DomainModel.Plans.BLOs.Version>() { CallBase = true };
            newMock.SetupGet(mock => mock.ID).Returns(1);
            newMock.SetupGet(mock => mock.StartDateTime).Returns(startDateTime);
            newMock.SetupGet(mock => mock.EndDateTime).Returns(endDateTime);



            return newMock;
        }
        private Mock<MedicineRuleItem> CreateRuleItemMock(string medicineTypeName)
        {

            var medTypeMock = new Mock<MedicineType>();
            medTypeMock.SetupGet(mock => mock.Name).Returns(medicineTypeName);

            var medRuleItemMock = new Mock<MedicineRuleItem>();
            medRuleItemMock.SetupGet(mock => mock.MedicineType).Returns(medTypeMock.Object);

            return medRuleItemMock;
        }

        #region RecentlyStarted Tests 


        // Test with StartDateTime in the future -> should return false 
        [Theory]
        [InlineData(14, 0, 0, 0)]
        [InlineData(0, 1, 0, 1)]
        public void RecentlyStarted_StartDateTimeInTheFuture_ReturnsFalse(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Add(new TimeSpan(days, hours, minutes, seconds));
            DateTime? endDateTime = null;
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);
            versionMock.Setup(mock => mock.HasEnded()).Returns(false);
            versionMock.Setup(mock => mock.HasStarted()).Returns(false);

            // Act 
            var result = versionMock.Object.RecentlyStarted();

            // Assert 
            result.Should().Be(false);
        }

        // Test with StartDateTime in the past, less than 7 days -> should return true
        [Theory]
        [InlineData(12, 0, 0, 0)]
        [InlineData(7, 0, 0, 0)] // this returns false because a few seconds are added as the tests are run
        public void RecentlyStarted_StartDateTimeInThePastMoreThan7Days_ReturnsFalse(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Subtract(new TimeSpan(days, hours, minutes, seconds));
            DateTime? endDateTime = null;
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);
            versionMock.Setup(mock => mock.HasEnded()).Returns(false);
            versionMock.Setup(mock => mock.HasStarted()).Returns(true);

            // Act 
            var result = versionMock.Object.RecentlyStarted();

            // Assert 
            result.Should().Be(false);
        }

        // Test with StartDateTime, more than 7 days -> should return false 
        [Theory]
        [InlineData(2, 0, 0, 0)]
        [InlineData(5, 0, 0, 0)]
        public void RecentlyStarted_StartDateTimeInThePastLessThan7Days_ReturnsTrue(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Subtract(new TimeSpan(days, hours, minutes, seconds));
            DateTime? endDateTime = null;
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);
            versionMock.Setup(mock => mock.HasEnded()).Returns(false);
            versionMock.Setup(mock => mock.HasStarted()).Returns(true);

            // Act 
            var result = versionMock.Object.RecentlyStarted();

            // Assert 
            result.Should().Be(true);
        }

        #endregion

        #region HasStarted Tests

        [Theory]
        [InlineData(14, 0, 0, 0)]
        [InlineData(0, 0, 0, 1)]
        [InlineData(0, 0, 1, 1)]
        [InlineData(0, 1, 0, 0)]
        [InlineData(1, 0, 0, 0)]
        public void HasStarted_StartDateTimeBeforePresent_ReturnsTrue(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Subtract(new TimeSpan(days, hours, minutes, seconds));
            DateTime? endDateTime = null;
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);


            // Act 
            var result = versionMock.Object.HasStarted();

            // Assert 
            result.Should().Be(true);
        }
        [Theory]
        [InlineData(14, 0, 0, 0)]
        [InlineData(0, 0, 0, 1)]
        [InlineData(0, 0, 0, 2)]
        [InlineData(0, 0, 1, 1)]
        [InlineData(0, 1, 0, 1)]
        public void HasStarted_StartDateTimeAfterPresent_ReturnsFalse(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Add(new TimeSpan(days, hours, minutes, seconds));
            DateTime? endDateTime = null;
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);


            // Act 
            var result = versionMock.Object.HasStarted();

            // Assert 
            result.Should().Be(false);
        }


        #endregion

        #region HasEnded Tests

        [Theory]
        [InlineData(14, 0, 0, 0)]
        [InlineData(0, 0, 0, 1)]
        [InlineData(0, 0, 0, 2)]
        [InlineData(0, 0, 1, 1)]
        [InlineData(0, 1, 0, 1)]
        public void HasEnded_EndDateTimeBeforePresent_ReturnsTrue(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Subtract(new TimeSpan(days + 10, hours, minutes, seconds));
            DateTime? endDateTime = currentDateTime.Subtract(new TimeSpan(days, hours, minutes, seconds));
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);


            // Act 
            var result = versionMock.Object.HasEnded();

            // Assert 
            result.Should().Be(true);
        }
        [Theory]
        [InlineData(14, 0, 0, 0)]
        [InlineData(0, 0, 0, 1)]
        [InlineData(0, 0, 0, 2)]
        [InlineData(0, 0, 1, 1)]
        [InlineData(0, 1, 0, 1)]
        public void HasEnded_EndDateTimeAfterPresent_ReturnsFalse(int days, int hours, int minutes, int seconds)
        {
            // Arrange
            var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
            DateTime startDateTime = currentDateTime.Subtract(new TimeSpan(days + 10, hours, minutes, seconds));
            DateTime? endDateTime = currentDateTime.Add(new TimeSpan(days, hours, minutes, seconds));
            var versionMock = this.CreateVersionBLOMockWithoutRules(startDateTime, endDateTime);


            // Act 
            var result = versionMock.Object.HasEnded();

            // Assert 
            result.Should().Be(false);
        }


        #endregion

        #region GetIntersectionWithDateRange Tests
        // Not included as the important logic is tested as part of Common.Functions.IntersectDateRanges
        #endregion

        #region GetUniqueMedicineTypes Tests

        [Fact]
        public void GetUniqueMedicineTypes_MockBLOWith5UniqueMedicineTypes_ReturnsTrue()
        {
            // Arrange
            var versionMock = this.CreateVersionBLOMockWithoutRules(DateTime.Now, null);
            var rule1Mock = new Mock<Rule>();
            rule1Mock.SetupGet(mock => mock.MedicineRuleItems).Returns(new List<MedicineRuleItem> {
                CreateRuleItemMock("Vitamin C").Object, CreateRuleItemMock("Probiotics").Object, CreateRuleItemMock("Vitamin D").Object}
            );
            var rule2Mock = new Mock<Rule>();
            rule2Mock.SetupGet(mock => mock.MedicineRuleItems).Returns(new List<MedicineRuleItem> {
                CreateRuleItemMock("Vitamin C").Object, CreateRuleItemMock("Probiotics").Object, CreateRuleItemMock("Vitamin C").Object}
            );
            versionMock.SetupGet(mock => mock.Rules).Returns( new List<Rule> { rule1Mock.Object, rule2Mock.Object });

            // Act 
            var result = versionMock.Object.GetUniqueMedicineTypes();

            // Assert
            result.Should().HaveCount(3);
        }
        #endregion
    }



}



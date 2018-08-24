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
        private Mock<BLL.DomainModel.Plans.BLOs.Version> CreateVersionBLOMock(DateTime startDateTime, DateTime? endDateTime, List<Rule> rules)
        {

            // Mock the BLO
            var newMock = new Mock<BLL.DomainModel.Plans.BLOs.Version>() { CallBase = true };
            newMock.SetupGet(mock => mock.ID).Returns(1);
            newMock.SetupGet(mock => mock.StartDateTime).Returns(startDateTime);
            newMock.SetupGet(mock => mock.EndDateTime).Returns(endDateTime);

            newMock.SetupGet(mock => mock.Rules).Returns(rules);

            return newMock;
        }


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
            var versionMock = this.CreateVersionBLOMock(startDateTime, endDateTime, null);


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
            var versionMock = this.CreateVersionBLOMock(startDateTime, endDateTime, null);


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
            var versionMock = this.CreateVersionBLOMock(startDateTime, endDateTime, null);


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
            var versionMock = this.CreateVersionBLOMock(startDateTime, endDateTime, null);


            // Act 
            var result = versionMock.Object.HasEnded();

            // Assert 
            result.Should().Be(false);
        }


        #endregion

    }



}



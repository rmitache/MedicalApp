using FluentAssertions;
using Common.DataStructures;
using Common;
using System.Collections.Generic;
using System.Text;
using Xunit;
using System;

namespace Common.UnitTests.Functions
{
    public class FunctionsTests
    {
        private Range<DateTime> ParseDateTimesAsRange(string startDateStr, int lengthInDays)
        {
            if (startDateStr == null)
            {
                return null;
            }

            var startDate = DateTime.Parse(startDateStr);
            var endDate = startDate.AddDays(lengthInDays);

            var range = new Range<DateTime>(startDate, endDate);
            return range;
        }

        #region IntersectDateRanges Tests
        [Theory]
        [InlineData("2018-05-10 22:00", 20, "2018-12-20 22:00", 20)]
        [InlineData("2018-05-10 22:00", 0, "2018-05-11 22:00", 1)]
        [InlineData("2018-10-01 12:00", 0, "2018-10-01 13:00", 0)]
        [InlineData("2018-10-01 00:00", 1, "2018-10-02 00:01", 1)]
        public void IntersectDateRanges_NonOverlappingRanges_ReturnsNull(string firstRangeStartStr, int firstRangeLength,
            string secondRangeStartStr, int secondRangeLength)
        {
            // Arrange
            var firstRange = ParseDateTimesAsRange(firstRangeStartStr, firstRangeLength);
            var secondRange = ParseDateTimesAsRange(secondRangeStartStr, secondRangeLength);

            // Act
            var result = Common.Functions.IntersectDateRanges(firstRange, secondRange);

            // Assert
            result.Should().BeNull();
        }

        [Theory]
        [InlineData("2018-10-01 22:00", 19, "2018-10-10 22:00", 20, 10)]
        [InlineData("2018-10-01 00:00", 1, "2018-10-02 00:00", 1, 0)] // minute and hours in a day are rounded down if they are less than 12
        [InlineData("2018-10-01 12:01", 1, "2018-10-02 00:00", 1, 1)]
        public void IntersectDateRanges_OverlappingRanges_ReturnsCorrectLengthRange(string firstRangeStartStr, int firstRangeLength,
            string secondRangeStartStr, int secondRangeLength, int expectedDays)
        {
            // Arrange
            var firstRange = ParseDateTimesAsRange(firstRangeStartStr, firstRangeLength);
            var secondRange = ParseDateTimesAsRange(secondRangeStartStr, secondRangeLength);

            // Act
            var result = Common.Functions.IntersectDateRanges(firstRange, secondRange);

            // Assert
            var daysInIntersection = Math.Round((result.RangeEnd - result.RangeStart).TotalDays);
            result.Should().NotBeNull();
            daysInIntersection.Should().Be(expectedDays);
        }


        [Theory]
        [InlineData(null, null, "2018-10-10 22:00", 20)]
        [InlineData("2018-10-10 22:00", 20, null, null)]
        public void IntersectDateRanges_NullRanges_ThrowsException(string firstRangeStartStr, int firstRangeLength,
            string secondRangeStartStr, int secondRangeLength)
        {
            // Arrange
            var firstRange = ParseDateTimesAsRange(firstRangeStartStr, firstRangeLength);
            var secondRange = ParseDateTimesAsRange(secondRangeStartStr, secondRangeLength);

            // Act and assert
            Action act = () => Common.Functions.IntersectDateRanges(firstRange, secondRange);

            // Assert
            act.Should().Throw<ArgumentNullException>();
        }

        [Theory]
        [InlineData("2018-10-01 22:00", 19, DateTimeKind.Local, "2018-10-10 22:00", 20, DateTimeKind.Utc)]
        [InlineData("2015-10-01 22:00", 19, DateTimeKind.Unspecified, "2013-10-10 22:00", 20, DateTimeKind.Local)]
        public void IntersectDateRanges_DifferentKindRanges_ThrowsException(string firstRangeStartStr, int firstRangeLength, DateTimeKind firstRangeKind,
            string secondRangeStartStr, int secondRangeLength, DateTimeKind secondRangeKind)
        {
            // Arrange
            var firstRange = ParseDateTimesAsRange(firstRangeStartStr, firstRangeLength);
            firstRange = new Range<DateTime>(DateTime.SpecifyKind(firstRange.RangeStart, firstRangeKind), DateTime.SpecifyKind(firstRange.RangeEnd, firstRangeKind));
            var secondRange = ParseDateTimesAsRange(secondRangeStartStr, secondRangeLength);
            secondRange = new Range<DateTime>(DateTime.SpecifyKind(secondRange.RangeStart, secondRangeKind), DateTime.SpecifyKind(secondRange.RangeEnd, secondRangeKind));

            // Act 
            Action act = () => Common.Functions.IntersectDateRanges(firstRange, secondRange);

            // Assert
            act.Should().Throw<ArgumentException>();
        }
        #endregion


        #region DateRangeContains Tests
        [Theory]
        [InlineData("2018-10-01 22:00", 19, "2018-10-10 22:00", true)]
        [InlineData("2018-10-01 22:00", 2, "2018-10-03 22:01", false)]
        [InlineData("2018-10-01 22:00", 2, "2018-10-03 22:00", true)]
        public void DateRangeContains_ValidRangeAndDate_ReturnsCorrectIsContainedCheck(string firstRangeStartStr, int firstRangeLength,
            string targetDateTimeToCheck, bool expectedResult)
        {
            // Arrange
            var firstRange = ParseDateTimesAsRange(firstRangeStartStr, firstRangeLength);
            var targetDate = DateTime.Parse(targetDateTimeToCheck);

            // Act 
            var result = Common.Functions.DateRangeContains(firstRange, targetDate);

            // Assert
            result.Should().Be(expectedResult);
        }

        [Theory]
        [InlineData(null, 2, "2018-10-03 22:00")]
        public void DateRangeContains_NullRange_ThrowsException(string firstRangeStartStr, int firstRangeLength,
            string targetDateTimeToCheck)
        {
            // Arrange
            var firstRange = ParseDateTimesAsRange(firstRangeStartStr, firstRangeLength);
            var targetDate = DateTime.Parse(targetDateTimeToCheck);

            // Act 
            Action act = () => Common.Functions.DateRangeContains(firstRange, targetDate);

            // Assert
            act.Should().Throw<ArgumentNullException>();
        }

        #endregion

        #region ConvertToLocalDateTime Tests

        [Theory]
        [InlineData("2018-10-03 22:00", -120)]
        [InlineData("2018-10-03 22:00", 240)]
        public void ConvertToLocalDateTime_ValidUTCDateTime_AppliesOffsetCorrectlyAndChangesKind(string utcDateTimeStr, int offsetInMinutes)
        {
            // Arrange
            var utcDateTime = DateTime.Parse(utcDateTimeStr);
            utcDateTime = DateTime.SpecifyKind(utcDateTime, DateTimeKind.Utc);

            // Act 
            var result = Common.Functions.ConvertToLocalDateTime(utcDateTime, offsetInMinutes);

            // Assert
            var expectedResult = utcDateTime.AddMinutes(-offsetInMinutes);
            result.Should().Be(expectedResult);
            result.Kind.Should().Be(DateTimeKind.Local);
        }

        #endregion


        #region ConvertToUTCDateTime Tests

        [Theory]
        [InlineData("2018-10-03 22:00", -120)]
        [InlineData("2018-10-03 22:00", 240)]
        public void ConvertToUTCDateTime_ValidLocalDateTime_AppliesOffsetCorrectlyAndChangesKind(string localDateTimeStr, int offsetInMinutes)
        {
            // Arrange
            var localDateTime = DateTime.Parse(localDateTimeStr);
            localDateTime = DateTime.SpecifyKind(localDateTime, DateTimeKind.Local);

            // Act 
            var result = Common.Functions.ConvertToUTCDateTime(localDateTime, offsetInMinutes);

            // Assert
            var expectedResult = localDateTime.AddMinutes(offsetInMinutes);
            result.Should().Be(expectedResult);
            result.Kind.Should().Be(DateTimeKind.Utc);
        }

        #endregion  
    }
}

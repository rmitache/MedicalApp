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
        #endregion
    }
}

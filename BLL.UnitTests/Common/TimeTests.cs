using Common.DataStructures;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BLL.UnitTests.Common
{
    public class TimeTests
    {

        // Private methods
        private Mock<Time> CreateTimeMockWithHoursAndMins(int hours, int minutes)
        {
            // Mock the BLO
            var newTimeMock = new Mock<Time>();
            newTimeMock.SetupGet(time => time.Hours).Returns(hours);
            newTimeMock.SetupGet(time => time.Minutes).Returns(minutes);

            return newTimeMock;
        }

        #region Constructor Tests
        [Theory]
        [InlineData(-1, -1)]
        [InlineData(5, -1)]
        [InlineData(-1, 5)]
        [InlineData(24, 59)]
        [InlineData(23, 89)]
        public void Constructor_InvalidInputs_ThrowsArgumentException(int hours, int minutes)
        {
            Assert.Throws<ArgumentException>(() => new Time(hours, minutes));
        }
        [Theory]
        [InlineData(14, 14)]
        [InlineData(4, 4)]
        public void Constructor_ValidInputs_CreatesInstanceWithMatchingProperties(int hours, int minutes)
        {
            var timeInstance = new Time(hours, minutes);
            Assert.Equal(timeInstance.Hours, hours);
            Assert.Equal(timeInstance.Minutes, minutes);
        }
        #endregion


        #region ParseString Tests
        [Theory]
        [InlineData(10, 30)]
        [InlineData(15, 45)]
        public void ParseString_ValidInput_CreatesInstanceWithMatchingProperties(int hours, int minutes)
        {
            var validString = hours + ":" + minutes;
            var timeInstance = Time.ParseString(validString);
            Assert.Equal(timeInstance.Hours, hours);
            Assert.Equal(timeInstance.Minutes, minutes);
        }
        [Fact]
        public void ParseString_InvalidInputWithSpaces_ReturnsNull()
        {
            var validString = " 20:  30";
            var timeInstance = Time.ParseString(validString);
            Assert.Null(timeInstance);
        }
        [Fact]
        public void ParseString_NullInput_ThrowsException()
        {
            string str = null;
            Assert.Throws<ArgumentNullException>(() => Time.ParseString(str));
        }
        [Theory]
        [InlineData(-10, -30)]
        [InlineData(15, 145)]
        [InlineData(215, 145)]
        public void ParseString_InvalidInputNumbersOutOfBounds_ReturnsNull(int hours, int minutes)
        {
            var validString = hours + ":" + minutes;
            var timeInstance = Time.ParseString(validString);

            Assert.Null(timeInstance);
        }
        [Theory]
        [InlineData("Hello there")]
        [InlineData(": : : : : ")]
        public void ParseString_InvalidInputMisformedStrings_ReturnsNull(string str)
        {
            var timeInstance = Time.ParseString(str);

            Assert.Null(timeInstance);
        }
        #endregion


        #region ParseCommaSeparatedString Tests
        [Theory]
        [InlineData("10:30,15:30", 2)]
        [InlineData("19:30,12:30, 19:45", 2)]
        public void ParseCommaSeparatedString_ValidInput_CreatesListWithMatchingCountIgnoringMisformedSubstrings(string str, int expectedCount)
        {
            var listOfTimeInstances = Time.ParseCommaSeparatedString(str);
            Assert.Equal(expectedCount, listOfTimeInstances.Count);
        }
        [Theory]
        [InlineData("; ; ; ;")]
        [InlineData(", , , , ,")]
        public void ParseCommaSeparatedString_InvalidInputMisformedOrNullString_ReturnsEMptyList(string str)
        {
            var resultList = Time.ParseCommaSeparatedString(str);
            Assert.Equal(0, resultList.Count);
        }

        [Theory]
        [InlineData(null)]
        public void ParseCommaSeparatedString_NullInput_ThrowsException(string str)
        {
            Assert.Throws<ArgumentNullException>(() => Time.ParseCommaSeparatedString(str));
        }
        #endregion

        #region ToCommaSeparatedString Tests
        [Fact]
        public void ToCommaSeparatedString_NullList_ThrowsException()
        {
            Assert.Throws<ArgumentNullException>(() => Time.ToCommaSeparatedString(null));
        }
        [Fact]
        public void ToCommaSeparatedString_EmptyListInput_ReturnsEmptyString()
        {
            var timesList = new List<Time>();
            var result = Time.ToCommaSeparatedString(timesList);

            Assert.Equal("", result);
        }
        [Fact]
        public void ToCommaSeparatedString_ValidListInput_ReturnsMatchingString()
        {
            Mock<Time> CreateTimeMock()
            {
                // Mock the BLO
                var newTimeMock = new Mock<Time>();
                newTimeMock.Setup(time => time.ToString()).Returns("timemock");

                return newTimeMock;
            }

            var timesList = new List<Time>();
            timesList.Add(CreateTimeMock().Object);
            timesList.Add(CreateTimeMock().Object);
            timesList.Add(CreateTimeMock().Object);

            var result = Time.ToCommaSeparatedString(timesList);
            Assert.Equal("timemock,timemock,timemock", result);
        }
        #endregion

        #region ToSeconds Tests

        [Theory]
        [InlineData(10,10)]
        [InlineData(15, 10)]
        [InlineData(23, 59)]
        public void ToSeconds_ClassWithHoursAndMinutes_CorrectNumberOfSeconds(int hours, int minutes)
        {
            var mock = this.CreateTimeMockWithHoursAndMins(hours, minutes);
            mock.CallBase = true;
           

            var result = mock.Object.ToSeconds();
            Assert.Equal(3600 * hours + 60 * minutes, result);
        }
        #endregion

        #region ToString Tests

        [Fact]
        public void ToString_ClassWithHoursAndMinutes_CorrectString()
        {
            var mock = this.CreateTimeMockWithHoursAndMins(5, 30);
            mock.CallBase = true;


            var result = mock.Object.ToString();
            Assert.Equal("5:30", result);
        }
        #endregion
    }
}

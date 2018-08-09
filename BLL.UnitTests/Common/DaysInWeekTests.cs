using Common.DataStructures;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BLL.UnitTests.Common
{
    public class DaysInWeekTests
    {
        #region Constructor Tests

        [Theory]
        [InlineData(new bool[] { })]
        [InlineData(new bool[] { true, true, false, false, false, false, false, false })]
        public void Constructor_InvalidArray_ThrowsArgumentException(bool[] daysInWeekArray)
        {
            // Test method 
            Assert.Throws<ArgumentException>(() => new DaysInWeek(daysInWeekArray));
        }

        [Theory]
        [InlineData(new bool[] { true, true })]
        [InlineData(new bool[] { false, true, false, true, false, true })]
        [InlineData(new bool[] { false, false, false, false, false, false, false })]
        [InlineData(new bool[] { true, true, true, false })]
        public void Constructor_ValidArray_CreatesMatchingDaysOfWeek(bool[] daysInWeekArray)
        {
            // Prepare inputs
            var newInstance = new DaysInWeek(daysInWeekArray);

            var dict = new Dictionary<int, bool>
            {
                 { 0, newInstance.Monday },
                 { 1, newInstance.Tuesday },
                 { 2, newInstance.Wednesday },
                 { 3, newInstance.Thursday },
                 { 4, newInstance.Friday },
                 { 5, newInstance.Saturday },
                 { 6, newInstance.Sunday },
            };

            // Assertions 
            foreach (KeyValuePair<int, bool> entry in dict)
            {
                if (entry.Key < daysInWeekArray.Length)
                {
                    // Assert that any values in the array will result in the corresponding WeekDays to have the same bool value
                    Assert.Equal(daysInWeekArray[entry.Key], entry.Value);
                }
                else
                {
                    // Assert that any values NOT in the array, will get a default true value
                    Assert.True(entry.Value);
                }

            }
        }
        #endregion

        #region ParseCommaSeparatedString Tests
        [Theory]
        [InlineData("true,false,true,false")]
        public void ParseCommaSeparatedString_ValidString_MatchingDaysInWeek(string str)
        {
            var daysInWeek = DaysInWeek.ParseCommaSeparatedString(str);

            Assert.True(daysInWeek.Monday);
            Assert.False(daysInWeek.Tuesday);
            Assert.True(daysInWeek.Wednesday);
            Assert.False(daysInWeek.Thursday);
        }
        #endregion
    }
}

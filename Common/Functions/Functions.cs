using Common.DataStructures;
using Itenso.TimePeriod;
using System;
using System.Collections.Generic;
using System.Text;

namespace Common
{
    public static class Functions
    {
        public static Range<DateTime> IntersectDateRanges(Range<DateTime> firstDateRange, Range<DateTime> secondDateRange)
        {
            // Get the intersection using the TimePeriod library
            TimeRange firstTimeRange = new TimeRange(firstDateRange.RangeStart, firstDateRange.RangeEnd);
            TimeRange secondTimeRange = new TimeRange(secondDateRange.RangeStart, secondDateRange.RangeEnd);
            var intersectionTimeRange = firstTimeRange.GetIntersection(secondTimeRange);

            // Convert the intersection to a normal range<DateTime> object
            Range<DateTime> returnRange = null;
            if (intersectionTimeRange != null)
            {
                returnRange = new Range<DateTime>(intersectionTimeRange.Start, intersectionTimeRange.End);
            }
            return returnRange;
        }

        public static bool DateRangeContains(Range<DateTime> dateRange, DateTime dateTime)
        {
            bool isInRange = (dateTime >= dateRange.RangeStart) && (dateTime <= dateRange.RangeEnd);

            return isInRange;
        }

        public static DateTime GetCurrentDateTimeInUTC()
        {
            DateTime dt = DateTime.UtcNow;
            return dt;
        }
    }

}

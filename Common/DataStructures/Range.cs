using System;
using System.Collections.Generic;
using System.Linq;

namespace Common.Datastructures
{
    public class Range<T>
    {
        // Properties
        public T RangeStart { get; set; }

        public T RangeEnd { get; set; }

        // Constructors
        public Range()
        {
        }

        public Range(T rangeStart, T rangeEnd)
        {
            RangeStart = rangeStart;
            RangeEnd = rangeEnd;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Text;

namespace Common
{
    public static class Extensions
    {
        // Commented out because they are not supposed to be used as they cause problems because BE is in UTC
        //public static DateTime StartOfDay(this DateTime theDate)
        //{
        //    return theDate.Date;
        //}

        //public static DateTime EndOfDay(this DateTime theDate)
        //{
        //    return theDate.Date.AddDays(1).AddTicks(-1);
        //}

        public static DateTime ZeroMilliseconds(this DateTime dt)
        {
            return new DateTime(((dt.Ticks / 10000000) * 10000000), dt.Kind);
        }

    }

}

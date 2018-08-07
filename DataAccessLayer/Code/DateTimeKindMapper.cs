using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccessLayer.Code
{
    public class DateTimeKindMapper
    {
        public static DateTime Normalize(DateTime value)
            => DateTime.SpecifyKind(value, DateTimeKind.Utc);

        public static DateTime? NormalizeNullable(DateTime? value)
            => value.HasValue ? DateTime.SpecifyKind(value.Value, DateTimeKind.Utc) : (DateTime?)null;

        public static object NormalizeObject(object value)
            => value is DateTime dateTime ? Normalize(dateTime) : value;
    }
}

﻿using Ical.Net.DataTypes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Common.DataStructures
{
    public class DaysInWeek
    {
        // Properties
        public bool Monday { get; set; } = true;
        public bool Tuesday { get; set; } = true;
        public bool Wednesday { get; set; } = true;
        public bool Thursday { get; set; } = true;
        public bool Friday { get; set; } = true;
        public bool Saturday { get; set; } = true;
        public bool Sunday { get; set; } = true;

        // Constructors
        public DaysInWeek()
        {

        }
        public DaysInWeek(bool[] daysInWeekArray)
        {
            if (daysInWeekArray == null || daysInWeekArray.Length == 0 || daysInWeekArray.Length > 7)
            {
                throw new ArgumentException("Array empty or has more than 7 items");
            }


            if (daysInWeekArray.Length > 0)
                this.Monday = daysInWeekArray[0];

            if (daysInWeekArray.Length > 1)
                this.Tuesday = daysInWeekArray[1];

            if (daysInWeekArray.Length > 2)
                this.Wednesday = daysInWeekArray[2];

            if (daysInWeekArray.Length > 3)
                this.Thursday = daysInWeekArray[3];

            if (daysInWeekArray.Length > 4)
                this.Friday = daysInWeekArray[4];

            if (daysInWeekArray.Length > 5)
                this.Saturday = daysInWeekArray[5];

            if (daysInWeekArray.Length > 6)
                this.Sunday = daysInWeekArray[6];
        }
        public static DaysInWeek ParseCommaSeparatedString(string str)
        {
            string[] strArray = str.Split(",");


            bool[] array = strArray.Select(substr =>
            {
                return bool.Parse(substr);
            }).ToArray();

            var newObj = new DaysInWeek(array);
            return newObj;
        }

        // Public methods
        public string ToCommaSeparatedString()
        {
            string str = Monday.ToString().ToLower() + "," +
                Tuesday.ToString().ToLower() + "," +
                Wednesday.ToString().ToLower() + "," +
                Thursday.ToString().ToLower() + "," +
                Friday.ToString().ToLower() + "," +
                Saturday.ToString().ToLower() + "," +
                Sunday.ToString().ToLower();

            return str;
        }
        public List<WeekDay> ToICalWeekDayList()
        {
            List<WeekDay> list = new List<WeekDay>();
            if (this.Monday)
            {
                list.Add(new WeekDay("MO"));
            }
            if (this.Tuesday)
            {
                list.Add(new WeekDay("TU"));
            }
            if (this.Wednesday)
            {
                list.Add(new WeekDay("WE"));
            }
            if (this.Thursday)
            {
                list.Add(new WeekDay("TH"));
            }
            if (this.Friday)
            {
                list.Add(new WeekDay("FR"));
            }
            if (this.Saturday)
            {
                list.Add(new WeekDay("SA"));
            }
            if (this.Sunday)
            {
                list.Add(new WeekDay("SU"));
            }

            return list;
        }
        public bool CheckDayOfWeek(DayOfWeek dayOfWeek)
        {
            if(dayOfWeek== DayOfWeek.Monday)
            {
                return this.Monday;
            }
            if (dayOfWeek == DayOfWeek.Tuesday)
            {
                return this.Tuesday;
            }
            if (dayOfWeek == DayOfWeek.Wednesday)
            {
                return this.Wednesday;
            }
            if (dayOfWeek == DayOfWeek.Thursday)
            {
                return this.Thursday;
            }
            if (dayOfWeek == DayOfWeek.Friday)
            {
                return this.Friday;
            }
            if (dayOfWeek == DayOfWeek.Saturday)
            {
                return this.Saturday;
            }
            if (dayOfWeek == DayOfWeek.Sunday)
            {
                return this.Sunday;
            }

            return false;
        }
    }
}

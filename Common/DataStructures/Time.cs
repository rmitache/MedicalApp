using System;
using System.Collections.Generic;
using System.Linq;

namespace Common.DataStructures
{
    public class Time
    {
        public int Hours { get; set; }
        public int Minutes { get; set; }



        // Constructors
        public Time(int hours, int minutes)
        {
            if (hours < 0 || minutes < 0)
            {
                throw new ArgumentException("Hours and minutes must both be 0 or positive integers");
            }
            if (hours > 23 || minutes > 59)
            {
                throw new ArgumentException("Hours and minutes must be within normal clock bounds");
            }

            this.Hours = hours;
            this.Minutes = minutes;
        }
        public static Time ParseString(string str)
        {
            if (str == null)
            {
                throw new ArgumentNullException("str");

            }

            // Check for colon
            var strArray = str.Split(':');
            if (strArray.Length != 2)
            {
                return null;
            }

            // Parse Hours
            int hours;
            bool hoursIsANumber = int.TryParse(strArray[0], out hours);
            if (!hoursIsANumber || strArray[0].Length > 2 || hours < 0 || hours > 23)
            {
                return null;
            }

            // Parse Minutes
            int minutes;
            bool minutesIsANumber = int.TryParse(strArray[1], out minutes);
            if (!minutesIsANumber || strArray[1].Length < 2 || strArray[1].Length > 2 || minutes < 0 || minutes > 59)
            {
                return null;
            }

            // Create Time instance
            var newTime = new Time(hours, minutes);
            return newTime;

        }
        public static List<Time> ParseCommaSeparatedString(string str)
        {
            if (str == null)
            {
                throw new ArgumentNullException("str");
            }

            string[] strArray = str.Split(",");


            // Loop through the substrings and create Time instances
            List<Time> resultList = new List<Time>();
            foreach (string timeSubString in strArray)
            {
                var newTime = Time.ParseString(timeSubString);
                if (newTime != null)
                {
                    resultList.Add(newTime);
                }
            }



            return resultList;
        }
        public static string ToCommaSeparatedString(List<Time> timeList)
        {
            string str = "";
            for (int i = 0; i < timeList.Count; i++)
            {
                str += timeList[i].ToString() + ",";
            }

            //
            if (timeList.Count > 0)
                str = str.Remove(str.Length - 1);


            return str;
        }

        // Public methods
        public int ToSeconds()
        {
            var seconds = (this.Hours * 3600) + (this.Minutes * 60);
            return seconds;
        }
        public override string ToString()
        {
            string strHours, strMins;
            strHours = (this.Hours < 10) ? ("" + this.Hours) : this.Hours + "";
            strMins = (this.Minutes < 10) ? ("0" + this.Minutes) : this.Minutes + "";
            return strHours + ":" + strMins;

        }
    }
}

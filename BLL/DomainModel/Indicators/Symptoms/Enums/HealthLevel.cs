using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.Enums
{
    public enum HealthLevel
    {
        Great = 3,
        Good = 2,
        Ok = 1,
        Unspecified = 0,
        NotGreat = -1,
        Bad = -2,
        VeryBad = -3
    }
}

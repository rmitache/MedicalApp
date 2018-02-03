using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Factors.Medicine.Library.Enums
{
    public enum UnitDoseType
    {
        
        Unspecified = 0,

        // Packaged
        Pills = 1,
        Satchel = 2,
        Dispenser = 3,

        // FreeForm
        Teaspoons = 4,
        Drops = 5,
        Custom = 6

   
    }
}

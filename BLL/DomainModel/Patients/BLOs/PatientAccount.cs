using System;

namespace BLL.DomainModel.Patients.BLOs
{
    public class PatientAccount
    {
        // Properties
        public string Email { get; set; }
        public DateTime SignupDate { get; set; }
        public DateTime  BirthDate { get; set; }
        public string Language { get; set; }

        // Constructor
        internal PatientAccount() { }
    }
}

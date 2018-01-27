using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? SignupDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Language { get; set; }
    }
}

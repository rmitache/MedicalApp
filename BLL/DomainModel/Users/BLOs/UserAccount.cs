﻿using System;

namespace BLL.DomainModel.Users.BLOs
{
    public class UserAccount
    {
        // Properties
        public int ID { get; set; }
        public string Email { get; set; }
        public DateTime? SignupDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Language { get; set; }

        // Constructor
        internal UserAccount() { }
    }
}
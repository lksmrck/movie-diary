﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Users
{
    public class LoginResponseDto
    {
        public /*LocalUser*/UserDto User { get; set; }
        public string Token { get; set; }
    }
}

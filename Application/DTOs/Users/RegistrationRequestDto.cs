using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Users
{
    public class RegistrationRequestDto
    {
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Password { get; set; }
    }
}

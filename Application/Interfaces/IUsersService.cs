using Application.DTOs.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IUsersService
    {
        bool IsUniqueUser(string username);
        Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto);
        Task<UserDto> Register(RegistrationRequestDto registrationRequestDto);

    }
}

using Application.Core;
using Application.DTOs.Users;
using Domain;
using Domain.Users;
using Microsoft.AspNetCore.Mvc;
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
        Task<UserDto> Login(LoginRequestDto loginRequestDto);
        Task<ServiceResponse<UserDto>> Register(RegistrationRequestDto registrationRequestDto);
        Task<UserDto> GetCurrentUser(string userEmail);
        Task<RefreshToken> SetRefreshToken(UserDto user);
        Task<AppUser> GetUserFromRefreshToken(string refreshToken);
        UserDto CreateUserObject(AppUser user, bool withToken = true);
    }
}

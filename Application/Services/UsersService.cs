using Application.DTOs.Users;
using Application.Interfaces;
using AutoMapper;
using Domain.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using API.Services;
using Microsoft.AspNetCore.Http;

namespace Application.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;

        public UsersService(ApplicationDbContext db, IConfiguration configuration, UserManager<AppUser> userManager, IMapper mapper, TokenService tokenService)
        {
            _db = db;
            _userManager = userManager;
            _mapper = mapper;
            _tokenService = tokenService;
        }
        public bool IsUniqueUser(string username)
        {
            var user = _db.Users.FirstOrDefault(x => x.UserName == username);

            if (user == null)
            {
                return true;
            }
            return false;
        }

        public async Task<UserDto> Login(LoginRequestDto loginRequestDto)
        {
            // Find user in Identity table
            var user = _db.Users.FirstOrDefault(x => x.UserName.ToLower() == loginRequestDto.UserName.ToLower());

            // Check password (hashed in Identity table)
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (isValid)
            {
                return CreateUserObject(user);
            }

            return new UserDto();
        }

        public async Task<UserDto> Register(RegistrationRequestDto registrationRequestDto)
        {
            AppUser user = new()
            {
                UserName = registrationRequestDto.UserName,
                //PasswordHash = registrationRequestDto.Password,
                Name = registrationRequestDto.Name,
                Email = registrationRequestDto.Email,
            };

            try
            {
                var result = await _userManager.CreateAsync(user, registrationRequestDto.Password);
                if (result.Succeeded)
                {
                    var userToReturn = _db.Users.FirstOrDefault(u => u.UserName == registrationRequestDto.UserName);
                    return _mapper.Map<UserDto>(userToReturn);
                }
            }
            catch (Exception e)
            {

                throw;
            }

            return new UserDto();
        }

        public async Task<UserDto> GetCurrentUser(string userEmail)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            return CreateUserObject(user);
        }

        public async Task<AppUser> GetUserFromRefreshToken(string refreshToken)
        {
            var users = _userManager.Users
                .Include(r => r.RefreshTokens)
                .Where(u => u.RefreshTokens
                .Any(t => t.Token == refreshToken))
                .ToList();

            return users?.First();
        }


        public async Task<RefreshToken> SetRefreshToken(UserDto user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            var domainUser = await _db.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

            domainUser?.RefreshTokens.Add(refreshToken);

            await _userManager.UpdateAsync(domainUser);

            return refreshToken;
        }

        public UserDto CreateUserObject(AppUser user, bool withToken = true)
        {
            if (user == null)
            {
                return new UserDto();
            }

            return withToken ? new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Name = user.Name,
                //Image = user?.Photos?.FirstOrDefault(x => x.IsMain)?.Url,
                Token = _tokenService.CreateToken(user)
            } : new UserDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Name = user.Name,
            };
        }

    }
}

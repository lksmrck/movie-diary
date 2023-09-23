using Application.DTOs.Users;
using Application.Interfaces;
using AutoMapper;
using Domain.Users;
using Microsoft.AspNetCore.Identity;
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

namespace Application.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext _db;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private string secretKey;

        public UsersService(ApplicationDbContext db, IConfiguration configuration, UserManager<User> userManager, IMapper mapper)
        {
            _db = db;
            secretKey = configuration.GetValue<string>("ApiSettings:Secret");
            _userManager = userManager;
            _mapper = mapper;
        }
        public bool IsUniqueUser(string username)
        {
            var user = _db.Users.FirstOrDefault(x => x.UserName == username);
            //var user = _db.LocalUsers.FirstOrDefault(x => x.UserName == username);

            if (user == null)
            {
                return true;
            }
            return false;
        }

        public async Task<LoginResponseDto> Login(LoginRequestDto loginRequestDto)
        {
            // Find user in Identity table
            var user = _db.Users.FirstOrDefault(x => x.UserName.ToLower() == loginRequestDto.UserName.ToLower());

            // Check password (hashed in Identity table)
            bool isValid = await _userManager.CheckPasswordAsync(user, loginRequestDto.Password);

            if (user == null || isValid == false)
            {
                return new LoginResponseDto()
                {
                    User = null,
                    Token = ""
                };
            }

            // if user was found generate JWT Token
            var tokenHandler = new JwtSecurityTokenHandler();

            // Converts string into bytes array
            var key = Encoding.ASCII.GetBytes(secretKey);

            // Define token, which will be created 
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name,user.UserName.ToString()),
                    //new Claim(ClaimTypes.Name,user.Role),
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            LoginResponseDto loginResponseDto = new LoginResponseDto()
            {
                User = _mapper.Map<UserDto>(user),
                Token = tokenHandler.WriteToken(token)
            };

            return loginResponseDto;
        }

        public async Task<UserDto> Register(RegistrationRequestDto registrationRequestDto)
        {
            User user = new()
            {
                UserName = registrationRequestDto.UserName,
                //PasswordHash = registrationRequestDto.Password,
                Name = registrationRequestDto.Name,
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
            //LocalUser user = _mapper.Map<LocalUser>(registrationRequestDto);

            //_db.LocalUsers.Add(user);
            //await _db.SaveChangesAsync();
        }

    }
}

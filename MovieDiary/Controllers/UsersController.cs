using Application.DTOs.Users;
using Application.Interfaces;
using Domain;
using Domain.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Security.Claims;

namespace API.Controllers
{
    // api/Users
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersService _users;
        protected APIResponse _response;

        public UsersController(UserManager<AppUser> userManager, IUsersService users)
        {
            _users = users;
            _response = new APIResponse();
        }

        [Authorize]
        [HttpGet("current")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userEmail = User.FindFirstValue(ClaimTypes.Email);

            var user = await _users.GetCurrentUser(userEmail);

            await SetRefreshToken(user);

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto model)
        {

            var user = await _users.Login(model);

            if (user.UserName == null || string.IsNullOrEmpty(user.Token))
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = "Username or password is incorrect";
                return BadRequest(_response);
            }

            await SetRefreshToken(user);

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = user;
            return Ok(_response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Registration([FromBody] RegistrationRequestDto model)
        {
            bool isUserNameUnique = _users.IsUniqueUser(model.UserName);
            if (!isUserNameUnique)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = "User already exists";
                return BadRequest(_response);
            }

            var user = await _users.Register(model);

            if (user == null)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = "Error while registering";
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            return Ok(_response);
        }

        [Authorize]
        [HttpGet("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies?["refreshToken"];

            if (refreshToken == null)
            {
                _response.StatusCode = HttpStatusCode.Unauthorized;
                _response.IsSuccess = false;
                _response.ErrorMessage = "No refresh token provided.";
                return Unauthorized(_response);
            }


            var user = await _users.GetUserFromRefreshToken(refreshToken);

            if (user == null)
                return Unauthorized();

            var oldToken = user.RefreshTokens.SingleOrDefault(x => x.Token == refreshToken);

            if (oldToken == null || refreshToken == null)
                return Unauthorized();

            if (oldToken != null && !oldToken.IsActive)
                return Unauthorized();

            if (oldToken != null)
                oldToken.Revoked = DateTime.UtcNow;

            _response.StatusCode = HttpStatusCode.OK;
            _response.IsSuccess = true;
            _response.Result = _users.CreateUserObject(user);
            return Ok(_response);

        }

        private async Task SetRefreshToken(UserDto user)
        {
            var refreshToken = await _users.SetRefreshToken(user);

            var cookieOptions = new CookieOptions
            {
                // not accessible by JS
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7),
                Secure = true,
                SameSite = SameSiteMode.None,
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }
    }
}

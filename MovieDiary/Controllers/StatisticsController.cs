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
    public class StatisticsController : ControllerBase
    {

        protected APIResponse _response;

        public StatisticsController()
        {

            _response = new APIResponse();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetStatisticsForUser()
        {
            return null;
        }


    }
}

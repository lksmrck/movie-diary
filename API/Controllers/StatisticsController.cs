using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IStatisticsService _statistics;
        protected APIResponse _response = new APIResponse();

        public StatisticsController(IStatisticsService statistics)
        {
            _statistics = statistics;
        }

        [Authorize]
        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserCategory>))]
        public async Task<ActionResult<APIResponse>> GetStatisticsForUser(Guid userId)
        {
            var statistics = await _statistics.GetStatisticsForUser(userId);

            if (!statistics.IsValid)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessage = statistics.ErrorMessage;
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = statistics.Result;
            return Ok(_response);
        }
    }
}

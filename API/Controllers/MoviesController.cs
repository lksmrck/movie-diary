using Application.Core;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService _movies;
        protected APIResponse _response = new APIResponse();

        public MoviesController(IMoviesService movies)
        {
            _movies = movies;
        }

        [Authorize(Policy = "IsSameUser")]
        [HttpGet("/user/{userId}/movie/{movieId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<APIResponse>> GetMovie(Guid movieId)
        {
            try
            {
                if (movieId == Guid.Empty)
                {
                    _response.StatusCode = HttpStatusCode.BadRequest;
                    return BadRequest(_response);
                }

                MovieDto movie = await _movies.GetMovie(movieId);

                if (movie == null)
                {
                    _response.StatusCode = HttpStatusCode.NotFound;
                    return NotFound(_response);
                }

                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = movie;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
            }

            return BadRequest(_response);
        }

        [Authorize(Policy = "IsSameUser")]
        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
 
        public async Task<IActionResult> GetMoviesForUser(Guid userId)
        {
            var res = await _movies.GetMoviesForUser(userId);

            _response.Result = res;
            _response.StatusCode = HttpStatusCode.OK;
            return Ok(_response);
        }

        [Authorize]
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<APIResponse>> CreateMovie([FromBody] MovieDto movie)
        {
            try
            {
               
                ServiceResponse<MovieDto> serviceResponse = await _movies.CreateMovie(movie);

                if (!serviceResponse.IsValid)
                {
                    _response.StatusCode = HttpStatusCode.OK;
                    _response.IsSuccess = false;
                    _response.ErrorMessage = serviceResponse.ErrorMessage;
                    return Ok(_response);
                }

                _response.Result = serviceResponse.Result;
                _response.StatusCode = HttpStatusCode.Created;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
            }

            return BadRequest(_response);
        }

        [Authorize]
        [HttpDelete("{movieId}")]
        public async Task<ActionResult<APIResponse>> Delete(Guid movieId)
        {
            if (movieId == Guid.Empty)
            {
                return BadRequest();
            }

            bool res = await _movies.DeleteMovie(movieId);

            if (!res)
            {
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = "Movie could not be deleted based on received data.";
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.NoContent;
            _response.IsSuccess = true;

            return Ok(_response);
        }
    }
}

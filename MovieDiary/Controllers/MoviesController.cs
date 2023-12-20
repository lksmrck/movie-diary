using Application.Core;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Net;
using System.Security.Claims;
using System.Xml.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService _movies;
        //private readonly HttpContext _context;
        protected APIResponse _response = new APIResponse();

        public MoviesController(IMoviesService movies)
        {
            _movies = movies;
        }


        // GET: api/<MoviesController>

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<APIResponse>> GetMovies()
        {
            try
            {
                IEnumerable<MovieDto> moviesList;

                moviesList = await _movies.GetMovies();

                _response.StatusCode = HttpStatusCode.OK;
                _response.Result = moviesList;

                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
            }

            return BadRequest(_response);
        }

        // GET api/<MoviesController>/5
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

        // api/movies/userId
        //[Authorize(Policy = "IsSameUser")]
        [Authorize]
        [HttpGet("user/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetMoviesForUser(Guid userId)
        {
            try
            {
                var res = await _movies.GetMoviesForUser(userId);

                _response.Result = res;
                _response.StatusCode = HttpStatusCode.OK;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
            }

            return BadRequest(_response);
        }

        // POST api/<MoviesController>
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

        // PUT api/<MoviesController>/5
        [Authorize]
        [HttpPut("{movieId}")]
        public async Task<ActionResult<APIResponse>> Put(Guid movieId, [FromBody] MovieDto movie)
        {
            try
            {
                if (movie == null || movieId != movie.Id)
                {
                    return BadRequest();
                }

                await _movies.UpdateMovie(movie);

                _response.StatusCode = HttpStatusCode.NoContent;
                return Ok(_response);

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
            }

            return _response;
        }

        // DELETE api/<MoviesController>/5
        [Authorize]
        [HttpDelete("{movieId}")]
        public async Task<ActionResult<APIResponse>> Delete(Guid movieId)
        {
            try
            {
                if (movieId == Guid.Empty)
                {
                    return BadRequest();
                }

                await _movies.DeleteMovie(movieId);

                _response.StatusCode = HttpStatusCode.NoContent;
                _response.IsSuccess = true;

                return Ok(_response);

            }
            catch (Exception ex)
            {
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
            }

            return _response;
        }
    }
}

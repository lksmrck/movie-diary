using Application.Interfaces;
using Domain.Movies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly IMoviesService _movies;

        public MoviesController(IMoviesService movies)
        {
            _movies = movies;
        }


        // GET: api/<MoviesController>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Movie>))]
        public async Task<IActionResult> GetMovies()
        {
            return Ok(await _movies.GetMovies());
        }

        // GET api/<MoviesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<MoviesController>
        [HttpPost]
        public async Task<IActionResult> CreateMovie([FromBody] Movie movie)
        {

            var movieToAdd = new Movie
            {
                Title = movie.Title,
                Description = movie.Description,
                Category = movie.Category,
                DateCreated = DateTime.Now,
                DateWatched = DateTime.Now,
                User = movie.User,
                Rating = movie.Rating,
                Comment = movie.Comment,
                Categories = movie.Categories,
            };

            return Ok(await _movies.CreateMovie(movieToAdd));
        }

        // PUT api/<MoviesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MoviesController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

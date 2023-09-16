using Application.DTOs.Comments;
using Application.Interfaces;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {

        private readonly ICommentsService _comments;

        public CommentsController(ICommentsService comments)
        {
            _comments = comments;
        }

        // GET: api/<CommentsController>
        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<Comment>))]
        public async Task<IActionResult> Get()
        {
            return Ok(await _comments.GetComments());
        }

        // GET api/<CommentsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<CommentsController>/5
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetCommentsForUser(Guid userId)
        {
            return Ok(await _comments.GetCommentsForUser(userId));
        }

        // POST api/<CommentsController>
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentDto commentDto)
        {
            return Ok(await _comments.CreateComment(commentDto));
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("delete/{commentId}")]
        public async Task<IActionResult> DeleteComment(Guid commentId)
        {
            return Ok(await _comments.DeleteComment(commentId));
        }

      
        [HttpDelete("delete")]
        public async Task<IActionResult> DeleteComment(MovieDto movie)
        {
            return Ok(await _comments.DeleteComment(movie));
        }
    }
}

using Application.Core;
using Application.DTOs.Comments;
using Application.DTOs.Movies;
using Application.DTOs.Ratings;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {

        private readonly ICommentsService _comments;
        protected APIResponse _response = new APIResponse();

        public CommentsController(ICommentsService comments)
        {
            _comments = comments;
        }

        [Authorize]
        [HttpPost("createOrEdit")]
        public async Task<ActionResult<APIResponse>> CreateOrEditComment([FromBody] CreateOrEditCommentDto commentDto)
        {
            try
            {
                ServiceResponse<ShortComment> res = await _comments.CreateOrEditComment(commentDto);

                if (res.IsValid == false)
                {
                    _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                    _response.ErrorMessage = res.ErrorMessage;
                    _response.IsSuccess = false;
                    return BadRequest(_response);
                }

                _response.StatusCode = System.Net.HttpStatusCode.OK;
                _response.Result = res.Result;
                return Ok(_response);
            }
            catch (Exception ex)
            {
                _response.StatusCode = System.Net.HttpStatusCode.BadRequest;
                _response.IsSuccess = false;
                _response.ErrorMessage = ex.Message;
                return BadRequest(_response);
            }

        }
    }
}

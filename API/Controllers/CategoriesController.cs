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
    public class CategoriesController : ControllerBase
    {

        private readonly ICategoriesService _categories;
        protected APIResponse _response = new APIResponse();

        public CategoriesController(ICategoriesService categories)
        {
            _categories = categories;
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        [ProducesResponseType(200, Type = typeof(IEnumerable<UserCategory>))]
        public async Task<ActionResult<APIResponse>> GetCategoriesForUser(Guid userId)
        {
            var categories = await _categories.GetAllCategoriesForUser(userId);

            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = categories;
            return Ok(_response);
        }


        [AllowAnonymous]
        [HttpPost("{userId}")]
        public async Task<ActionResult<APIResponse>> CreateCategory(Guid userId, [FromBody] CategoryDto categoryDto)
        {
            var newCategories = await _categories.CreateCategoryAndReturnAllCategories(userId, categoryDto.Name);

            if (newCategories == null)
            {
                _response.IsSuccess = false;
                _response.StatusCode = HttpStatusCode.BadRequest;
                _response.ErrorMessage = "Error occured when creating category.";
                return BadRequest(_response);
            }

            _response.StatusCode = HttpStatusCode.OK;
            _response.Result = newCategories;

            return Ok(_response);
        }
    }
}

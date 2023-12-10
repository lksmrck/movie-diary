using Application.Core;
using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Domain.DTOs;
using Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICategoriesService
    {
        /// <summary>
        /// Method to return UserCategory object based on category name
        /// </summary>
        /// <param name="name">Category name</param>
        /// <returns>Returns UserCategory object (gets from DB or create if no such category found)</returns>
        Task<UserCategory> GetCategory(string name);
        Task<List<CategoryDto>> GetAllCategoriesForUser(Guid userId);
        Task<List<CategoryDto>> CreateCategoryAndReturnAllCategories(Guid userId, string categoryName);
    }
}

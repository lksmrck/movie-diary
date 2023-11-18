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
        Task<List<CategoryDto>> GetAllCategories();
        Task<Category> GetOrCreateCategory(string name);
    }
}

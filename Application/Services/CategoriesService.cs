using Application.Core;
using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class CategoriesService : ICategoriesService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;


        public CategoriesService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<CategoryDto>> GetAllCategories()
        {
            return await _context.Categories
                .ProjectTo<CategoryDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<Category> GetOrCreateCategory(string name)
        {
            var catFound = await _context.Categories.FirstOrDefaultAsync(c => c.Name == name);

            if (catFound != null)
            {
                return catFound;
            }

            var catToAdd = new Category { Name = name };

            await _context.AddAsync(catToAdd);
            await _context.SaveChangesAsync();

            return await _context.Categories.FirstOrDefaultAsync(c => c.Name == name);
        }
    }
}

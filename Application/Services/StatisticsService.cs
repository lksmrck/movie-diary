using Application.Core;
using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Application.Enums;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.DTOs;
using Domain.Movies;
using Domain.Statistics;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class StatisticsService : IStatisticsService
    {

        private readonly IMoviesService _moviesService;
        private readonly ServiceResponse<Statistics> _response = new ServiceResponse<Statistics>();

        public StatisticsService(IMoviesService moviesService)
        {
            _moviesService = moviesService;
        }

        public async Task<ServiceResponse<Statistics>> GetStatisticsForUser(Guid id)
        {
            var movies = await _moviesService.GetMoviesForUser(id);

            _response.Result = new Statistics
            {
                MoviesWatched = movies.Count(),
                AverageRating = movies.Average(m => m.Rating.Value),
                TotalHorror = movies.Where(m => m.DefaultCategories.Contains(CategoryEnumMethods.GetCategoryName(CategoryEnum.Horror))).Count(),
                TotalComedy = movies.Where(m => m.DefaultCategories.Contains(CategoryEnumMethods.GetCategoryName(CategoryEnum.Comedy))).Count(),
                TotalAdventure = movies.Where(m => m.DefaultCategories.Contains(CategoryEnumMethods.GetCategoryName(CategoryEnum.Adventure))).Count(),
                TotalRomantic = movies.Where(m => m.DefaultCategories.Contains(CategoryEnumMethods.GetCategoryName(CategoryEnum.Romantic))).Count(),
                TotalDrama = movies.Where(m => m.DefaultCategories.Contains(CategoryEnumMethods.GetCategoryName(CategoryEnum.Romantic))).Count(),
                TotalHistory = movies.Where(m => m.DefaultCategories.Contains(CategoryEnumMethods.GetCategoryName(CategoryEnum.Romantic))).Count(),
            };

            return _response;
        }
    }
}

using Application.Core;
using Application.Enums;
using Application.Interfaces;
using Domain.Statistics;

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

            if (movies == null)
            {
                _response.IsValid = false;
                _response.ErrorMessage = "No movies found for this user";  
                return _response;
            }

            var moviesWithFilledRating = movies.Where(m => m.Rating != null && m.Rating?.Value != null);

            _response.Result = new Statistics
            {
                MoviesWatched = movies.Count(),
                AverageRating = ((float)(moviesWithFilledRating.Any() ? moviesWithFilledRating.Average(m => m.Rating?.Value) : 0)).ToString("F1"),
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

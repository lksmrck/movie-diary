using Application.Core;
using Application.DTOs.Comments;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using Domain.Movies;
using Domain.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Security.Claims;

namespace Application.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContext;
        private readonly ICategoriesService _categories;
        private readonly ServiceResponse<MovieDto> _response = new ServiceResponse<MovieDto>();

        public MoviesService(ApplicationDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, ICategoriesService categories)
        {
            _context = context;
            _mapper = mapper;
            _httpContext = httpContextAccessor;
            _categories = categories;
        }
        public async Task<ServiceResponse<MovieDto>> CreateMovie(MovieDto movie)
        {
            if (!CompareUser(movie.User.Id, _httpContext))
                return null;

            // Check if movie is already added
            var movieAlreadyAdded = _context.Movies.Any(m => m.Title == movie.Title);

            if (movieAlreadyAdded)
            {
                _response.IsValid = false;
                _response.ErrorMessage = "Movie already added";
                return _response;
            }

            Movie movieToAdd = _mapper.Map<Movie>(movie);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == movie.User.Id);

            if (user != null)
            {
                movieToAdd.User.User = user;
                if (movieToAdd.Comment != null)
                {
                    movieToAdd.Comment.UserID = user.Id;
                }

                if (movieToAdd.Rating != null)
                {
                    movieToAdd.Rating.UserID = user.Id;
                }
            }

            if (movieToAdd.UserCategories != null)
            {
                List<UserCategory> categories = new List<UserCategory>();

                foreach (var cat in movie.UserCategories)
                {
                    var category = await _categories.GetCategory(cat.Name);

                    if (category != null)
                    {
                        categories.Add(category);
                    }
                }

                movieToAdd.UserCategories = categories;
            }

            await _context.AddAsync(movieToAdd);
            await _context.SaveChangesAsync();

            MovieDto addedMovie = _mapper.Map<MovieDto>(movieToAdd);

            _response.Result = addedMovie;
            return _response;
        }

        //TODO: nesmaže se Comment z tab Comments, jen join z MovieComments - jinak ale funguje a zobrazuje jak má.
        public async Task<bool> DeleteMovie(Guid movieId)
        {
            //Movie movieToDelete = _mapper.Map<Movie>(movie);

            Movie movieToDelete = await _context.Movies.FirstOrDefaultAsync(x => x.Id == movieId);

            if (movieToDelete != null && !CompareUser(movieToDelete.User.UserID, _httpContext))
                return false;

            _context.Movies.Remove(movieToDelete);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<MovieDto> GetMovie(Guid id)
        {

            var movie = await _context.Movies
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<MovieDto>(movie);
        }

        public async Task<List<MovieDto>> GetMoviesForUser(Guid userId)
        {
            //return new List<MovieDto>();
            return await _context.Movies
                .Where(c => c.User.UserID == userId)
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

        }

        private static bool CompareUser(Guid userId, IHttpContextAccessor _httpContext)
        {
            var contextUserId = Guid.Parse(_httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            return contextUserId == userId;
        }
    }
}

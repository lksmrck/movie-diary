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

        public MoviesService(ApplicationDbContext context, IMapper mapper, IHttpContextAccessor httpContextAccessor, ICategoriesService categories)
        {
            _context = context;
            _mapper = mapper;
            _httpContext = httpContextAccessor;
            _categories = categories;
        }
        public async Task<MovieDto> CreateMovie(MovieDto movie)
        {
            if (!CompareUser(movie.User.Id, _httpContext))
                return null;

            Movie movieToAdd = _mapper.Map<Movie>(movie);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == movie.User.Id);

            if (user != null)
            {
                movieToAdd.User.User = user;
                movieToAdd.Comment.UserID = user.Id;
                movieToAdd.Rating.UserID = user.Id;
            }

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

            await _context.AddAsync(movieToAdd);
            await _context.SaveChangesAsync();

            MovieDto addedMovie = _mapper.Map<MovieDto>(movieToAdd);

            return addedMovie;

        }

        //TODO: nesmaže se Comment z tab Comments, jen join z MovieComments - jinak ale funguje a zobrazuje jak má.
        public async Task DeleteMovie(Guid movieId)
        {
            //Movie movieToDelete = _mapper.Map<Movie>(movie);

            Movie movieToDelete = await _context.Movies.FirstOrDefaultAsync(x => x.Id == movieId);

            if (movieToDelete != null && !CompareUser(movieToDelete.User.UserID, _httpContext))
                return;

            _context.Movies.Remove(movieToDelete);
            await _context.SaveChangesAsync();
        }

        public async Task<MovieDto> GetMovie(Guid id)
        {

            var movie = await _context.Movies
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => x.Id == id);

            return _mapper.Map<MovieDto>(movie);
        }

        public Task<MovieDto> GetMovie(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<List<MovieDto>> GetMovies()
        {
            return await _context.Movies
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<MovieDto>> GetMoviesForUser(Guid userId)
        {
            //return new List<MovieDto>();
            return await _context.Movies
                .Where(c => c.User.UserID == userId)
                .ProjectTo<MovieDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

        }

        public async Task<MovieDto> UpdateMovie(MovieDto movie)
        {
            if (!CompareUser(movie.User.Id, _httpContext))
                return null;

            Movie model = _mapper.Map<Movie>(movie);

            _context.Movies.Update(model);

            await _context.SaveChangesAsync();

            return movie;
        }


        private static bool CompareUser(Guid userId, IHttpContextAccessor _httpContext)
        {
            var contextUserId = Guid.Parse(_httpContext.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
            return contextUserId == userId;
        }
    }
}

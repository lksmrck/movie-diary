﻿using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace Application.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public MoviesService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<MovieDto> CreateMovie(MovieDto movie)
        {

            Movie movieToAdd = _mapper.Map<Movie>(movie); 
            
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == movie.User.Id);

            if (user != null)
            {
                movieToAdd.User.User = user;
                movieToAdd.Comment.UserID = user.Id;
                movieToAdd.Rating.UserID = user.Id;
            }

           List<Category> categories = new List<Category>();

           foreach (var cat in movie.Categories )
            {
                var category = await _context.Categories.FirstOrDefaultAsync(u => u.Id == cat.Id);

                if (category != null)
                {
                    categories.Add(category);
                }
            }

            movieToAdd.Categories = categories;

            await _context.AddAsync(movieToAdd);
            await _context.SaveChangesAsync();

            return movie;

        }

        public void DeleteMovie(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<MovieDto> GetMovie(Guid id)
        {
            //var movie = await _context.Movies
            //    .Include(m => m.User).ThenInclude(u=>u.User)
            //    .Include(m=> m.Rating).ThenInclude(r=>r.Rating)
            //    .Include(m=> m.Comment).ThenInclude(c=>c.Comment)
            //    .FirstOrDefaultAsync(m => m.Id == id);

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

        public Movie UpdateMovie(int id, Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}

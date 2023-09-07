using Application.Interfaces;
using Domain.DTOs;
using Domain.Movies;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class MoviesService : IMoviesService
    {
        private readonly ApplicationDbContext _context;


        public MoviesService(ApplicationDbContext context)
        {
            _context = context;

        }
        public async Task<Movie> CreateMovie(Movie movie)
        {


            await _context.AddAsync(movie);
            await _context.SaveChangesAsync();

            return movie;



        }

        public void DeleteMovie(int id)
        {
            throw new NotImplementedException();
        }

        public Movie GetMovie(int id)
        {
            throw new NotImplementedException();
        }

        public Movie GetMovie(string name)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Movie>> GetMovies()
        {
            return await _context.Movies
              

                .ToListAsync();
        }

        public Movie UpdateMovie(int id, Movie movie)
        {
            throw new NotImplementedException();
        }
    }
}

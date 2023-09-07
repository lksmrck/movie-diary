using Domain.DTOs;
using Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IMoviesService
    {
        Task<List<Movie>> GetMovies();
        Movie GetMovie(int id);
        Movie GetMovie(string name);
        Task<Movie> CreateMovie(Movie movie);
        Movie UpdateMovie(int id, Movie movie);
        void DeleteMovie(int id);
    }
}

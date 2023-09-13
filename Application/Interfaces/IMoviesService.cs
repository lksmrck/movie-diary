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
        Task<List<MovieDto>> GetMovies();
        Task<MovieDto> GetMovie(Guid id);
        Task<MovieDto> GetMovie(string name);
        Task<MovieDto> CreateMovie(MovieDto movie);
        Movie UpdateMovie(int id, Movie movie);
        void DeleteMovie(int id);
    }
}

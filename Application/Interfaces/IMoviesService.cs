using Application.Core;
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
        Task<List<MovieDto>> GetMoviesForUser(Guid userId);
        Task<ServiceResponse<MovieDto>> CreateMovie(MovieDto movie);
        Task<MovieDto> UpdateMovie(MovieDto movie);
        Task DeleteMovie(Guid id);
    }
}

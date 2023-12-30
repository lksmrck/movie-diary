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
        Task<MovieDto> GetMovie(Guid id);
        Task<List<MovieDto>> GetMoviesForUser(Guid userId);
        Task<ServiceResponse<MovieDto>> CreateMovie(MovieDto movie);
        Task<bool> DeleteMovie(Guid id);
    }
}

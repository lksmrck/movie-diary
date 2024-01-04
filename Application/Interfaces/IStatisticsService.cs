using Application.Core;
using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Domain.DTOs;
using Domain.Movies;
using Domain.Statistics;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface IStatisticsService
    {
        /// <summary>
        /// Method to return movies statistics for user
        /// </summary>
        /// <param id="id">user Id</param>
        /// <returns>Returns Statistics object</returns>
        Task<ServiceResponse<Statistics>> GetStatisticsForUser(Guid id);
    }
}

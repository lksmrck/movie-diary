using Application.Core;
using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Services
{
    public class StatisticsService : IStatisticsService
    {
        public Task<Movie> GetStatisticsForUser(Guid userId)
        {
            throw new NotImplementedException();
        }
    }
}

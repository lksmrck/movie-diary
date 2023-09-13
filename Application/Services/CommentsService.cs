using Application.DTOs.Comments;
using Application.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class CommentsService : ICommentsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;

        public CommentsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<Comment>> GetComments()
        {
            return await _context.Comments
                .Include(c => c.Movie)
                .ToListAsync();
        }

        public async Task<List<CommentDto>> GetCommentsForUser(Guid userId)
        {

            var comments = await _context.MovieComments.Include(c => c.Movie)
                .Where(c => c.UserID == userId)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
                .ToListAsync();

            return comments;
        }
    }
}

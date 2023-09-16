using Application.Core;
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
    public class CommentsService : ICommentsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        protected ServiceResponse<CommentDto> _response = new ServiceResponse<CommentDto>();

        public CommentsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets all comments of all users and all movies.
        /// </summary>
        public async Task<List<CommentDto>> GetComments()
        {
            return await _context.MovieComments
                .Include(c => c.Movie)
                .ProjectTo<CommentDto>(_mapper.ConfigurationProvider)
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

        public async Task<CreateCommentDto> CreateComment(CreateCommentDto commentDto)
        {

            MovieComment commentToAdd = _mapper.Map<MovieComment>(commentDto);

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == commentDto.UserID);


            if (user != null)
            {   
                commentToAdd.UserID = user.Id;
                commentToAdd.User = user; 
            }

            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.Id == commentDto.MovieID);

            if (movie != null)
            {
                commentToAdd.Movie = movie;
            }

            await _context.MovieComments.AddAsync(commentToAdd);
            await _context.SaveChangesAsync();

            return commentDto;

        }

        public async Task<ServiceResponse<CommentDto>> DeleteComment(MovieDto movie)
        {
            return _response;
        }

        public async Task<ServiceResponse<CommentDto>> DeleteComment(Guid commentId)
        {
            var commentToDelete = await _context.Comments.FirstOrDefaultAsync(c => c.Id == commentId);

            if (commentToDelete == null)
            {
                _response.IsValid = false;
                _response.ErrorMessage = "Comment does not exist.";  

                return _response;
            }

            _context.Comments.Remove(commentToDelete);
            
            await _context.SaveChangesAsync();

            return _response;
        }
    }
}

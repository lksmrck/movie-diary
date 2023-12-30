using Application.Core;
using Application.DTOs.Comments;
using Application.DTOs.Movies;
using Application.Interfaces;
using AutoMapper;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.EntityFrameworkCore;
using Persistence;

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

        public async Task<ServiceResponse<ShortComment>> CreateOrEditComment(CreateOrEditCommentDto commentDto)
        {
            var _indiResponse = new ServiceResponse<ShortComment>();

            // Pokud není ID komentu k editaci, tak vytváříme nový
            if (commentDto.Id == null)
            {
                var commentToCreate = new MovieComment
                {
                    MovieID = commentDto.MovieID,
                    UserID = commentDto.UserID,
                    Comment = new Comment
                    {
                        Text = commentDto.Text,
                    }
                };

                await _context.MovieComments.AddAsync(commentToCreate);
                await _context.SaveChangesAsync();

                _indiResponse.Result = _mapper.Map<ShortComment>(commentToCreate);
                return _indiResponse;
            }

            // Pokud je ID, tak updatujeme
            var commentToUpdate = new Comment
            {
                Id = commentDto.Id.Value,
                Text = commentDto.Text
            };

            _context.Comments.Update(commentToUpdate);
            await _context.SaveChangesAsync();

            _indiResponse.Result = _mapper.Map<ShortComment>(commentToUpdate);
            return _indiResponse;
        }
    }
}

using Application.Core;
using Application.DTOs.Comments;
using Application.DTOs.Movies;
using Domain.DTOs;
using Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Interfaces
{
    public interface ICommentsService
    {
        /// <summary>
        /// Gets all comments of specific user.
        /// </summary>
        /// <param name="userId">Specific user id</param>
        /// /// <returns> Returs list of comments</returns>
        Task<ServiceResponse<CommentDto>> DeleteComment(Guid commentId);
        Task<ServiceResponse<ShortComment>> CreateOrEditComment(CreateOrEditCommentDto shortComment);
    }
}

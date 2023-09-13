﻿using Application.DTOs.Comments;
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
        Task<List<Comment>> GetComments();
        Task<List<CommentDto>> GetCommentsForUser(Guid userId);
    }
}

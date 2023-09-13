using Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Comments
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public Guid MovieID { get; set; }
        public ShortMovie Movie { get; set; }
    }
}

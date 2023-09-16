using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Comments
{
    public record CreateCommentDto
    {
        public string Text { get; set; }
        public Guid UserID { get; set; }
        public Guid MovieID { get; set; }
    }
}

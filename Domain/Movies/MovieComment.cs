using Domain.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
    public class MovieComment
    {
        public Guid CommentID { get; set; }
        public Comment Comment { get; set; }
        public Guid UserID { get; set; }
        public AppUser User { get; set; }
        public Guid MovieID { get; set; }
        public Movie Movie { get; set; }
    }
}

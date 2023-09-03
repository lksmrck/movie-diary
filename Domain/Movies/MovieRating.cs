using Domain.Users;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
   
    public class MovieRating
    {
        public int Id { get; set; }
        public Guid MovieID { get; set; }
        public Movie Movie { get; set; }
        public Guid RatingID { get; set; }
        public Rating Rating { get; set; }
        public Guid UserID { get; set; }
        public User User { get; set; }
    }
}

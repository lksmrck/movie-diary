using Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    public class User
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<MovieUser> MovieUsers { get; set; }
        public ICollection <MovieComment> MovieComments { get; set; }
        public ICollection <MovieRating> MovieRatings { get; set; }
    }
}

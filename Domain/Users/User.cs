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
        public string Name { get; set; }
        public ICollection<Movie> Movies { get; set; }
        public ICollection <Comment> Comments { get; set; }
        public ICollection <Rating> Ratings { get; set; }
    }
}

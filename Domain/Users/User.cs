using Domain.Movies;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    //public class User
    //{
    //    public Guid Id { get; set; }
    //    public string Name { get; set; }
    //    public ICollection<MovieRating> Ratings { get; set; }
    //    public ICollection<MovieUser> Movies { get; set; }
    //    public ICollection<MovieComment> Comments { get; set; }
    //}

    public class User : IdentityUser
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<MovieRating> Ratings { get; set; }
        public ICollection<MovieUser> Movies { get; set; }
        public ICollection<MovieComment> Comments { get; set; }
    }
}

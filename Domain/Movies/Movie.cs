using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
    public class Movie
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        //Tohle bude user specific category
        //public ICollection<Category> Category { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateWatched { get; set; }
        public MovieUser MovieUser { get; set; }
        public MovieRating MovieRating { get; set; }
        public MovieComment MovieComment { get; set; }
        public ICollection<MovieCategory> MovieCategories { get; set; }

    }
}

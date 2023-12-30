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
        public string PosterPath { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public DateTime? DateWatched { get; set; } = null;
        public MovieUser User { get; set; }
        public MovieRating Rating { get; set; }
        public MovieComment Comment { get; set; }
        public List<string> DefaultCategories { get; set; }
        public ICollection<UserCategory>? UserCategories { get; set; }

    }
}

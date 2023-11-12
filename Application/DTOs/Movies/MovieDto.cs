using Application.DTOs.Movies;
using Domain.Movies;
using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public record MovieDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        //Tohle bude user specific category
        //public ICollection<Category> Category { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateWatched { get; set; }
        public string PosterPath { get; set; }
        public Profile User { get; set; }
        public ShortRating Rating { get; set; }
        public ShortComment Comment { get; set; }
        public ICollection<ShortCategory> Categories { get; set; }
    }
}

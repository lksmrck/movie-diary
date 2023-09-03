using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.Movies;
using Domain.Users;

namespace Persistence
{
    public class Seed
    {
        private readonly ApplicationDbContext _context;

        public Seed(ApplicationDbContext context)
        {
            _context = context;
        }

        public void SeedData()
        {
            //if (!_context.Movies.Any())
            //{
            //    Console.WriteLine("Neseeduju");
            //    return;
            //};

            var movies = new List<Movie>
            {
                new Movie
                {
                    Title = "Past Movie 1",
                    Description = "Movie about ninjas.",
                    Category = "users specific category",
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    MovieUser = new MovieUser {  User = new User {Name = "Pavel Novák" } },
                    //MovieRating = new MovieRating { Rating = new Rating {Value = 5 } },
                    //MovieComment = new MovieComment {  Comment = new Comment { Text = "Good movie" } },
                    MovieCategories = new List<MovieCategory> {new MovieCategory { Category = new Category { Name = "Akční" } }, new MovieCategory { Category = new Category { Name = "Komedie" } } }
                },
                new Movie
                {
                    Title = "Past Movie 1",
                    Description = "Movie about ninjas.",
                    Category = "users specific category2",
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    MovieUser = new MovieUser { User = new User {Name = "Pavel Novák" } },
                    //MovieRating = new MovieRating { Rating = new Rating {Value = 5 } },
                    //MovieComment = new MovieComment { Comment = new Comment { Text = "Sračka" } },
                    MovieCategories = new List<MovieCategory> {new MovieCategory { Category = new Category { Name = "Drama" } }, new MovieCategory { Category = new Category { Name = "Horor" } } }
                },

            };

            _context.Movies.AddRange(movies);
            _context.SaveChanges();
        }
    }
}
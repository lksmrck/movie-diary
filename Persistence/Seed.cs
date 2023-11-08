using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection.Metadata;
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
            if (_context.Movies.Any()) return;

            var users = new List<AppUser>
            {
                new AppUser
                {
                    Id = Guid.NewGuid(),
                    Name = "Jan Novák"
                },
                 new AppUser
                {
                    Id = Guid.NewGuid(),
                    Name = "Dana Drábová"
                }
            };

            var categories = new List<Category>
            {
               new Category
               { Id = Guid.NewGuid(),
                 Name = "Komedie"
               },
               new Category
               { Id = Guid.NewGuid(),
                 Name = "Krimi"
               },
               new Category
               { Id = Guid.NewGuid(),
                 Name = "Horor"
               },
               new Category
               { Id = Guid.NewGuid(),
                 Name = "Akční"
               }
            };

            var movies = new List<Movie>
            {
                new Movie
                {
                    Title = "Past Movie 1",
                    Description = "Movie about ninjas.",
                    Category = "users specific category",
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    User = new MovieUser{User = users[0] },
                    Rating = new MovieRating {UserID = users[0].Id,  Rating = new Rating { Value = 5 } } ,
                    Comment = new MovieComment { UserID = users[0].Id, Comment = new Comment{ Text = "Good movie" }  },
                    Categories = new List<Category> {categories[0], categories[1] } 
                },
                new Movie
                {
                    Title = "Past Movie 2",
                    Description = "Movie about turtles.",
                    Category = "users specific category2",
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    User = new MovieUser{User = users[1] } ,
                    Rating = new MovieRating {UserID = users[1].Id, Rating = new Rating { Value = 5 }  },
                    Comment = new MovieComment {UserID = users[1].Id,Comment = new Comment{ Text = "Sračka" } } ,
                    Categories = new List<Category> {categories[1] }
                },
                new Movie
                {
                    Title = "Past Movie 3",
                    Description = "Movie about elephants.",
                    Category = "users specific category3",
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    User = new MovieUser{User = users[1] } ,
                    Rating = new MovieRating {UserID = users[1].Id, Rating = new Rating { Value = 5 }  },
                    Comment = new MovieComment {UserID = users[1].Id,Comment = new Comment{ Text = "Super film" } } ,
                    Categories = new List<Category> {categories[1], categories[2] }
                },
                new Movie
                {
                    Title = "Past Movie 4",
                    Description = "Movie about turtles.",
                    Category = "users specific category4",
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    User = new MovieUser{User = users[0] } ,
                    Rating = new MovieRating {UserID = users[0].Id, Rating = new Rating { Value = 5 }  },
                    Comment = new MovieComment {UserID = users[0].Id,Comment = new Comment{ Text = "Boží" } } ,
                    Categories = new List<Category> {categories[0], categories[1], categories[3] }
                },

            };
            _context.Users.AddRange(users);
            _context.Movies.AddRange(movies);
            _context.SaveChanges();
        }
    }
}
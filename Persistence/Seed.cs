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
                    Name = "Jan Novák",
                    Email = "jannovak@novak.com"
                },
                 new AppUser
                {
                    Id = Guid.NewGuid(),
                    Name = "Dana Drábová",
                    Email = "danadrabova@drabova.com"
                }
            };

            //var categories = new List<UserCategory>
            //{
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Komedie",
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Krimi"
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Horor"
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Akční"
            //   }
            //};

            //var categories0 = new List<UserCategory>
            //{
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Komedie",
            //     User = users[0]
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Krimi",
            //     User = users[0]
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Horor",
            //     User = users[0]
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Akční",
            //     User = users[0]
            //   }
            //};

            //var categories1 = new List<UserCategory>
            //{
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Komedie",
            //     User = users[1]
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Krimi",
            //     User = users[1]
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Horor",
            //     User = users[1]
            //   },
            //   new UserCategory
            //   { Id = Guid.NewGuid(),
            //     Name = "Akční",
            //     User = users[1]
            //   }
            //};






            var categories = new List<UserCategory>();

            foreach (var user in users)
            {
                var cat1 = new UserCategory
                {
                    Id = Guid.NewGuid(),
                    Name = "Moje kategorie 1",
                    User = user
                };

                var cat2 = new UserCategory
                {
                    Id = Guid.NewGuid(),
                    Name = "Moje kategorie 2",
                    User = user
                };
                var cat3 = new UserCategory
                {
                    Id = Guid.NewGuid(),
                    Name = "Moje kategorie 3",
                    User = user
                };
                var cat4 = new UserCategory
                {
                    Id = Guid.NewGuid(),
                    Name = "Moje kategorie 4",
                    User = user
                };

                categories.Add(cat1);
                categories.Add(cat2);
                categories.Add(cat3);
                categories.Add(cat4);
            }

            var movies = new List<Movie>
            {
                new Movie
                {
                    Title = "Past Movie 1",
                    Description = "Movie about ninjas.",
                    DefaultCategories = new List<string>{"Default1", "Default2"},
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    PosterPath = "/kfkyALfD4G1mlBJI1lOt2QCra4i.jpg",
                    User = new MovieUser{User = users[0] },
                    Rating = new MovieRating {UserID = users[0].Id,  Rating = new Rating { Value = 5 } } ,
                    Comment = new MovieComment { UserID = users[0].Id, Comment = new Comment{ Text = "Good movie" }  },
                    //UserCategories = new List<UserCategory> {categories[0], categories[1] },
                    UserCategories = categories.Where(c => c.User == users[0]).ToList()
                    //UserCategories = categories0
                },
                new Movie
                {
                    Title = "Past Movie 2",
                    Description = "Movie about turtles.",
                    DefaultCategories = new List<string>{"Default3", "Default4"},
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    PosterPath = "/kfkyALfD4G1mlBJI1lOt2QCra4i.jpg",
                    User = new MovieUser{User = users[1] } ,
                    Rating = new MovieRating {UserID = users[1].Id, Rating = new Rating { Value = 5 }  },
                    Comment = new MovieComment {UserID = users[1].Id,Comment = new Comment{ Text = "Sračka" } } ,
                    //UserCategories = new List<UserCategory> {categories[1] }
                    UserCategories = categories.Cast<UserCategory>().Where(c => c.User == users[1]).ToList()
                     //UserCategories = categories1

                },
                new Movie
                {
                    Title = "Past Movie 3",
                    Description = "Movie about elephants.",
                    DefaultCategories = new List<string>{"Default3", "Default4"},
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    PosterPath = "/kfkyALfD4G1mlBJI1lOt2QCra4i.jpg",
                    User = new MovieUser{User = users[1] } ,
                    Rating = new MovieRating {UserID = users[1].Id, Rating = new Rating { Value = 5 }  },
                    Comment = new MovieComment {UserID = users[1].Id,Comment = new Comment{ Text = "Super film" } } ,
                    //UserCategories = new List<UserCategory> {categories[1], categories[2] }
                    UserCategories = categories.Cast<UserCategory>().Where(c => c.User == users[1]).ToList()
                },
                new Movie
                {
                    Title = "Past Movie 4",
                    Description = "Movie about turtles.",
                    DefaultCategories = new List<string>{"Default5", "Default6"},
                    DateCreated = DateTime.UtcNow.AddMonths(-2),
                    DateWatched = DateTime.UtcNow.AddMonths(-1),
                    PosterPath = "/kfkyALfD4G1mlBJI1lOt2QCra4i.jpg",
                    User = new MovieUser{User = users[0] } ,
                    Rating = new MovieRating {UserID = users[0].Id, Rating = new Rating { Value = 5 }  },
                    Comment = new MovieComment {UserID = users[0].Id,Comment = new Comment{ Text = "Boží" } } ,
                    //UserCategories = new List<UserCategory> {categories[0], categories[1], categories[3] }
                    UserCategories = categories.Cast<UserCategory>().Where(c => c.User == users[0]).ToList()
                },

            };
            _context.Users.AddRange(users);
            _context.Movies.AddRange(movies);
            _context.SaveChanges();
        }
    }
}
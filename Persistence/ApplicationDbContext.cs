using Domain;
using Domain.Movies;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<UserCategory> Categories { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        // Comments
        public DbSet<Comment> Comments { get; set; }
        public DbSet<MovieComment> MovieComments { get; set; }

        // Ratings
        public DbSet<MovieRating> MovieRatings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Movie>().Navigation(e => e.User).AutoInclude();
            modelBuilder.Entity<Movie>().Navigation(e => e.Rating).AutoInclude();
            modelBuilder.Entity<Movie>().Navigation(e => e.Comment).AutoInclude();
            modelBuilder.Entity<Movie>().Navigation(e => e.UserCategories).AutoInclude();

            modelBuilder.Entity<Movie>()
               .Property(x => x.DefaultCategories)
               .HasConversion(new ValueConverter<List<string>, string>(
               v => JsonConvert.SerializeObject(v), // Convert to string for persistence
               v => JsonConvert.DeserializeObject<List<string>>(v)));


            base.OnModelCreating(modelBuilder);



            //OK - ONE TO MANY
            modelBuilder.Entity<MovieUser>()
                .HasKey(mc => new { mc.MovieID, mc.UserID });

            modelBuilder.Entity<MovieUser>()
                .HasOne(m => m.User)
                .WithMany(mc => mc.Movies)
                .HasForeignKey(m => m.UserID);

            modelBuilder.Entity<MovieUser>()
               .HasOne(m => m.Movie)
               .WithOne(mc => mc.User)
               .HasForeignKey<MovieUser>(m => m.MovieID);
            //////////////////////////////////////////////////////


            //OK - ONE TO ONE (and one to many with User)
            modelBuilder.Entity<MovieRating>()
           .HasKey(mc => new { mc.MovieID, mc.RatingID });

            modelBuilder.Entity<MovieRating>()
                .HasOne(m => m.Movie)
                .WithOne(mc => mc.Rating)
                .HasForeignKey<MovieRating>(m => m.MovieID);

            modelBuilder.Entity<MovieRating>()
                .HasOne(m => m.Rating)
                .WithOne(mc => mc.Movie)
                .HasForeignKey<MovieRating>(m => m.RatingID);

            modelBuilder.Entity<MovieRating>()
            .HasOne(m => m.User)
            .WithMany(mc => mc.Ratings)
            .HasForeignKey(m => m.UserID);
            //////////////////////////////////////////////////////



            //OK - ONE TO ONE (and one to many with User)
            modelBuilder.Entity<MovieComment>()
                .HasKey(mc => new { mc.MovieID, mc.CommentID });

            modelBuilder.Entity<MovieComment>()
                .HasOne(m => m.Movie)
                .WithOne(mc => mc.Comment)
                .HasForeignKey<MovieComment>(m => m.MovieID);

            modelBuilder.Entity<MovieComment>()
               .HasOne(m => m.Comment)
               .WithOne(mc => mc.Movie)
               .HasForeignKey<MovieComment>(m => m.CommentID);

            modelBuilder.Entity<MovieComment>()
             .HasOne(m => m.User)
             .WithMany(mc => mc.Comments)
             .HasForeignKey(m => m.UserID);


            //////////////////////////////////////////////////////




        }
    }


}



using Domain.Movies;
using Domain.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
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

        public DbSet<User> Users { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Rating> Ratings { get; set; }
        public DbSet<Comment> Comments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //modelBuilder.Entity<Movie>(b =>
            //{
            //    b.HasMany(e => e.Categories)
            //    .WithMany(e => e.Movies)
            //    .HasForeignKey()

            //})

            //OK - MANY TO MANY
            modelBuilder.Entity<MovieCategory>()
                .HasKey(mc => new { mc.MovieID, mc.CategoryID });

            modelBuilder.Entity<MovieCategory>()
                .HasOne(m => m.Movie)
                .WithMany(mc => mc.MovieCategories)
                .HasForeignKey(m => m.MovieID);

            modelBuilder.Entity<MovieCategory>()
                .HasOne(m => m.Category)
                .WithMany(mc => mc.MovieCategories)
                .HasForeignKey(m => m.CategoryID);
            //////////////////////////////////////////////////////

            //OK - ONE TO MANY
            modelBuilder.Entity<MovieUser>()
                .HasOne(m => m.User)
                .WithMany(mc => mc.MovieUsers)
                .HasForeignKey(m => m.UserID);

            modelBuilder.Entity<MovieUser>()
               .HasOne(m => m.Movie)
               .WithOne(mc => mc.MovieUser)
               .HasForeignKey<MovieUser>(m => m.MovieID);
            //////////////////////////////////////////////////////


            //OK - ONE TO ONE (and one to many with User)
            modelBuilder.Entity<MovieRating>()
                .HasOne(m => m.Movie)
                .WithOne(mc => mc.MovieRating)
                .HasForeignKey<MovieRating>(m => m.MovieID);

            modelBuilder.Entity<MovieRating>()
                .HasOne(m => m.Rating)
                .WithOne(mc => mc.MovieRating)
                .HasForeignKey<MovieRating>(m => m.RatingID);

            modelBuilder.Entity<MovieRating>()
            .HasOne(m => m.User)
            .WithMany(mc => mc.MovieRatings)
            .HasForeignKey(m => m.UserID);
            //////////////////////////////////////////////////////

            //OK - ONE TO ONE (and one to many with User)
            modelBuilder.Entity<MovieComment>()
                .HasOne(m => m.Movie)
                .WithOne(mc => mc.MovieComment)
                .HasForeignKey<MovieComment>(m => m.MovieID);

            modelBuilder.Entity<MovieComment>()
               .HasOne(m => m.Comment)
               .WithOne(mc => mc.MovieComment)
               .HasForeignKey<MovieComment>(m => m.CommentID);

            modelBuilder.Entity<MovieComment>()
             .HasOne(m => m.User)
             .WithMany(mc => mc.MovieComments)
             .HasForeignKey(m => m.UserID);
            
            //////////////////////////////////////////////////////


           

        }
    }

    
}

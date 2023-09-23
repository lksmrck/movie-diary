using Application.DTOs.Comments;
using Application.DTOs.Users;
using AutoMapper;
using Domain.DTOs;
using Domain.Movies;
using Domain.Users;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {

            //Users
            CreateMap<User, UserDto>().ReverseMap();

            //Movies
            CreateMap<Movie, Movie>();
            CreateMap<Movie, MovieDto>();

            CreateMap<MovieDto, Movie>()
                .ForMember(d => d.Id, opt => opt.Ignore());



            CreateMap<MovieUser, DTOs.Movies.Profile>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.User.Name))
                .ReverseMap();



            CreateMap<MovieRating, DTOs.Movies.ShortRating>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Rating.Id))
                .ForMember(d => d.Value, o => o.MapFrom(s => s.Rating.Value))
                .ReverseMap();

            CreateMap<Category, DTOs.Movies.ShortCategory>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Name))
                .ReverseMap();

            // Comments
            CreateMap<MovieComment, DTOs.Movies.ShortComment>()
             .ForMember(d => d.Id, o => o.MapFrom(s => s.Comment.Id))
             .ForMember(d => d.Text, o => o.MapFrom(s => s.Comment.Text)).ReverseMap();

            CreateMap<DTOs.Movies.ShortComment, Comment>()
          .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
          .ForMember(d => d.Text, o => o.MapFrom(s => s.Text)).ReverseMap();


            //CreateMap<DTOs.Movies.ShortComment, MovieComment>()
            //.ForMember(d => d.CommentID, o => o.Ignore())
            //.ForMember(d => d.Comment.Text, o => o.MapFrom(s => s.Text));


            CreateMap<MovieComment, CommentDto>()
             .ForMember(d => d.Id, o => o.MapFrom(s => s.Comment.Id))
             .ForMember(d => d.Text, o => o.MapFrom(s => s.Comment.Text))
             .ForMember(d => d.Movie, o => o.MapFrom(s => s.Movie))
             //.ForMember(d => d.Movie, o => o.MapFrom(s => s.Movie))
             .ReverseMap();

            CreateMap<Comment, CreateCommentDto>()
            .ForMember(d => d.Text, o => o.MapFrom(s => s.Text))
            .ForMember(d => d.MovieID, o => o.MapFrom(s => s.MovieID))
            .ForMember(d => d.UserID, o => o.MapFrom(s => s.Movie.UserID))
            .ReverseMap();



            CreateMap<MovieComment, CreateCommentDto>()
            .ForMember(d => d.Text, o => o.MapFrom(s => s.Comment.Text))
            .ForMember(d => d.MovieID, o => o.MapFrom(s => s.Movie.Id))
            .ForMember(d => d.UserID, o => o.MapFrom(s => s.User.Id))
            .ReverseMap();


            CreateMap<Movie, ShortMovie>()
            .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Title))
            .ForMember(d => d.Categories, o => o.MapFrom(s => s.Categories))
            .ReverseMap();

        }
    }
}

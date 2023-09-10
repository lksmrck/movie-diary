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

            CreateMap<Movie, Movie>();
            CreateMap<Movie, MovieDto>();
               
            CreateMap<MovieUser, DTOs.Movies.Profile>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.User.Name));

            CreateMap<MovieComment, DTOs.Movies.ShortComment>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Comment.Id))
                .ForMember(d => d.Text, o => o.MapFrom(s => s.Comment.Text));

            CreateMap<MovieRating, DTOs.Movies.ShortRating>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Rating.Id))
                .ForMember(d => d.Value, o => o.MapFrom(s => s.Rating.Value));

            CreateMap<Category, DTOs.Movies.ShortCategory>()
                .ForMember(d => d.Id, o => o.MapFrom(s => s.Id))
                .ForMember(d => d.Name, o => o.MapFrom(s => s.Name));
        }
    }
}

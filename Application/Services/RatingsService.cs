using Application.Core;
using Application.DTOs.Movies;
using Application.DTOs.Ratings;
using Application.Interfaces;
using AutoMapper;
using Domain.Movies;
using Persistence;

namespace Application.Services
{
    public class RatingsService : IRatingsService
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        protected ServiceResponse<ShortRating> _response = new ServiceResponse<ShortRating>();

        public RatingsService(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServiceResponse<ShortRating>> CreateOrEditRating(CreateOrEditRatingDto ratingDto)
        {
            // Pokud není ID ratingu k editaci, tak vytváříme nový
            if (ratingDto.Id == null)
            {
                var ratingToCreate = new MovieRating
                {
                    MovieID = ratingDto.MovieID,
                    UserID = ratingDto.UserID,
                    Rating = new Rating
                    {
                        Value = ratingDto.Value,
                    }
                };

                await _context.MovieRatings.AddAsync(ratingToCreate);
                await _context.SaveChangesAsync();

                _response.Result = _mapper.Map<ShortRating>(ratingToCreate);
                return _response;
            }

            // Pokud je ID, tak updatujeme
            var ratingToUpdate = new Rating
            {
                Id = ratingDto.Id.Value,
                Value = ratingDto.Value
            };

            _context.Ratings.Update(ratingToUpdate);
            await _context.SaveChangesAsync();

            _response.Result = _mapper.Map<ShortRating>(ratingToUpdate);
            return _response;
        }
    }
}

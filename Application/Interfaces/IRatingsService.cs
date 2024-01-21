using Application.Core;
using Application.DTOs.Movies;
using Application.DTOs.Ratings;

namespace Application.Interfaces
{
    public interface IRatingsService
    {
        Task<ServiceResponse<ShortRating>> CreateOrEditRating(CreateOrEditRatingDto ratingDto);
    }
}

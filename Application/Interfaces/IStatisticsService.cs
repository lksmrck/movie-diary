using Domain.Movies;

namespace Application.Interfaces
{
    public interface IStatisticsService
    {
        /// <summary>
        /// Method returs statistics object for user
        /// </summary>
        /// <param userId="userId">User Id</param>
        /// <returns>Returnns created statistics object</returns>
        Task<Movie> GetStatisticsForUser(Guid userId);

    }
}

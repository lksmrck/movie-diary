using API.Controllers;
using Application.Core;
using Application.Interfaces;
using AutoFixture;
using Domain.DTOs;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace MovieDiary.Tests
{
    public class MoviesControllerTests
    {
        private Mock<IMoviesService> _moviesServiceMock; // TBD repository
        private Fixture _fixture; // for creating objects

        // Create instance of controller
        private MoviesController _controller;

        // ctor
        public MoviesControllerTests()
        {
            _fixture = new Fixture();
            _moviesServiceMock = new Mock<IMoviesService>();
        }

        [Test]
        public async Task Get_MoviesForUser_ReturnOk()
        {
            var movieList = _fixture.CreateMany<MovieDto>(3).ToList();

            _moviesServiceMock.Setup(repo => repo.GetMoviesForUser(It.IsAny<Guid>())).ReturnsAsync(movieList);

            _controller = new MoviesController(_moviesServiceMock.Object);

            var result = await _controller.GetMoviesForUser(It.IsAny<Guid>());
            var obj = result as ObjectResult;

            Assert.AreEqual(200, obj.StatusCode);
        }


        [Test]
        public async Task Get_MoviesForUser_ThrowException()
        {
            _moviesServiceMock.Setup(repo => repo.GetMoviesForUser(It.IsAny<Guid>())).Throws(new Exception());

            _controller = new MoviesController(_moviesServiceMock.Object);

            var result = await _controller.GetMoviesForUser(It.IsAny<Guid>());
            var obj = result as ObjectResult;

            Assert.AreEqual(400, obj.StatusCode);
        }

        [Test]
        public async Task Create_Movie_ReturningOk()
        {
            var movie = _fixture.Create<MovieDto>();
            var response = _fixture.Create<ServiceResponse<MovieDto>>();

            _moviesServiceMock.Setup(repo => repo.CreateMovie(It.IsAny<MovieDto>())).ReturnsAsync(response);

            _controller = new MoviesController(_moviesServiceMock.Object);

            var actionResult = await _controller.CreateMovie(movie);
            var result = actionResult.Result as OkObjectResult;

            Assert.AreEqual(200, result.StatusCode);
        }

        [Test]
        public async Task Delete_ValidMovieId_ReturnsNoContent()
        {
            // Arrange
            Guid movieId = Guid.NewGuid();

            _moviesServiceMock.Setup(repo => repo.DeleteMovie(movieId));
            _controller = new MoviesController(_moviesServiceMock.Object);

            // Act
            var actionResult = await _controller.Delete(movieId);
            var result = actionResult.Result as OkObjectResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(200, result.StatusCode);
        }
    }
}

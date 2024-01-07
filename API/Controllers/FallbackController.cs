using Application.DTOs.Categories;
using Application.DTOs.Comments;
using Application.Interfaces;
using Domain;
using Domain.DTOs;
using Domain.Movies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace API.Controllers
{

    [AllowAnonymous]
    public class FallbackController : Controller // we need view support for fallback
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html"), "text/html");

        }
    }
}

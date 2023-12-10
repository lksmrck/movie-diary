using Application.DTOs.Movies;
using Domain.Movies;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Comments
{
    public record ShortMovie
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<string> DefaultCategories { get; set; }
        public List<ShortCategory> UserCategories { get; set; }
    }
}

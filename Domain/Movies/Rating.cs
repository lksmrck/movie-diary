using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
    public class Rating
    {
        public Guid Id { get; set; }
        public int Value { get; set; }
        public MovieRating Movie { get; set; }
    }
}

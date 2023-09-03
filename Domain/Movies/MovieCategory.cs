using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
  
    public class MovieCategory
    {
        public int Id { get; set; }
        public Guid MovieID { get; set; }
        public Movie Movie { get; set; }
        public Guid CategoryID { get; set; }
        public Category Category { get; set; }

    }
}

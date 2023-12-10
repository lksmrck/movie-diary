using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
    /// <summary>
    /// Specific category created by User
    /// </summary>
    public class UserCategory
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public ICollection<Movie> Movies { get; set; }
        public AppUser User { get; set; }
    }
}

using Domain.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
    /// <summary>
    /// Specific comment created by User
    /// </summary>
    public class Comment
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public DateTime DateOfComment { get; set; } = DateTime.UtcNow;
        public Guid MovieID { get; set; }
        public MovieComment Movie { get; set; }
    }
}

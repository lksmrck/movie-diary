using Domain.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Movies
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public MovieComment MovieComment { get; set; }
    }
}

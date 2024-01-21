using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Ratings
{
    public record CreateOrEditRatingDto
    {
        public Guid? Id { get; set; }
        public float Value { get; set; }
        public Guid MovieID { get; set; }
        public Guid UserID { get; set; }
    }
}

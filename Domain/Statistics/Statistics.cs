using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Statistics
{
    public class Statistics
    {
        public int MoviesWatched { get; set; }
        public int TotalHoursWatched { get; set; }
        //public List<> NumberAndTimePerCategory { get; set; } // Per category
        public int AverageRating { get; set; }
        //public List<> AverageRatingPerCategory { get; set; }
        //public List<> MoviesPerMonths { get; set; }
        //public List<> MoviesPerWeekdays { get; set; }
    }
}

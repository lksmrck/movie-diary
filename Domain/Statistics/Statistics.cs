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
        //public int TotalHoursWatched { get; set; }
        //public List<> NumberAndTimePerCategory { get; set; } // Per category
        public float AverageRating { get; set; }
        public int TotalHorror { get; set; }
        public int TotalComedy { get; set; }
        public int TotalAdventure { get; set; }
        public int TotalRomantic { get; set; }
        public int TotalDrama { get; set; }
        public int TotalHistory { get; set; }

        //public List<> AverageRatingPerCategory { get; set; }
        //public List<> MoviesPerMonths { get; set; }
        //public List<> MoviesPerWeekdays { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Enums
{
    public enum CategoryEnum
    {
        Horror,
        Comedy,
        Adventure,
        Romantic,
        Drama,
        History
    }

    public static class CategoryEnumMethods
    {
        public static string GetCategoryName(CategoryEnum category)
        {
            return category switch
            {
                CategoryEnum.Horror => "Horror",
                CategoryEnum.Comedy => "Comedy",
                CategoryEnum.Adventure => "Adventure",
                CategoryEnum.Romantic => "Romantic",
                CategoryEnum.Drama => "Drama",
                CategoryEnum.History => "History",
                _ => throw new NotImplementedException()
            };
        }
    }
}

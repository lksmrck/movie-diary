using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Core
{
    public class ServiceResponse<T>
    {
        public bool  IsValid { get; set; } = true;
        public string ErrorMessage { get; set; }
        public T Result { get; set; }
    }
}

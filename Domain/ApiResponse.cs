using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class ApiResponse
    {
        public string Status { get; set; }
        public bool IsError { get; set; }
        public object Data { get; set; }
    }
}

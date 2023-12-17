using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class APIResponse
    {

        public APIResponse()
        {
        }
        public HttpStatusCode StatusCode { get; set; }
        public bool IsSuccess { get; set; } = true;
        public string ErrorMessage { get; set; }
        public object Result { get; set; }
    }
}

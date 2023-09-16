﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs.Movies
{
    public record ShortComment
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
    }
}

using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos
{
    public class CategoryDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string? Picture { get; set; }
        public IFormFile? FileImage { get; set; }
        public virtual ICollection<CourseDto>? Courses { get; set; }
    }
}

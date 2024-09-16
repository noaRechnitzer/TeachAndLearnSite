using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace Common.Dtos
{
    public enum Language
    {
        hebrew,
        english
    }
    public class CourseDto
    {        
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DatePublished { get; set; }
        public int Price_now { get; set; }
        public string? Picture { get; set; }
        public IFormFile? FileImage { get; set; }
        public string? Video { get; set; }
        public IFormFile? FileVideo { get; set; }
        public int LectureId { get; set; }
        public LectureDto? Lecture { get; set; }
        public virtual ICollection<int> CategoriesId { get; set; }
        public virtual ICollection<CategoryDto>? Categories { get; set; }
        public virtual ICollection<ResponseDto>? Responses { get; set; }
    }
}

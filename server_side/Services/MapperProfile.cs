using AutoMapper;
using Common.Dtos;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public class MapperProfile:Profile
    {
        public MapperProfile() 
        {
            CreateMap<Chapter, ChapterDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Response, ResponseDto>().ReverseMap();
            CreateMap<Lecture, LectureDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Purchase, PurchaseDto>().ReverseMap();
            CreateMap<Course, CourseDto>().ReverseMap();
            CreateMap<Views, ViewsDto>().ReverseMap();
        }
    }
}

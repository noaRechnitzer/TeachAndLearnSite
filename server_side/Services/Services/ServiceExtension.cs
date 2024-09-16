using AutoMapper;
using Common.Dtos;
using Microsoft.Extensions.DependencyInjection;
using Repository.Entity;
using Repository.Repositories;
using Services.Interfaes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public static class ServiceExtension
    {
        public static IServiceCollection AddServices(this IServiceCollection services) {
            services.AddRepository();
            services.AddScoped(typeof(IServices<CourseDto>),typeof(CourseService));
            services.AddScoped(typeof(IServices<CategoryDto>),typeof(CategoryService));
            services.AddScoped(typeof(IServicesExtention<LectureDto>),typeof(LectureService));
            services.AddScoped(typeof(IServices<ResponseDto>),typeof(ResponceService));
            services.AddScoped(typeof(IServicesExtention<UserDto>),typeof(UserService));
            services.AddScoped(typeof(IServices<PurchaseDto>),typeof(PurchaseService));
            services.AddScoped(typeof(IServices<ChapterDto>),typeof(ChapterService));
            services.AddScoped(typeof(IServices<ViewsDto>), typeof(ViewsService));
            services.AddAutoMapper(typeof(MapperProfile));

            return services;    
        }
    }
}


using Microsoft.Extensions.DependencyInjection;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public static class RepositoryExtension
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<Category>), typeof(CategoryRepository));
            services.AddScoped(typeof(IRepository<Lecture>), typeof(LectureRepository));
            services.AddScoped(typeof(IRepository<Response>), typeof(ResponseRepository));
            services.AddScoped(typeof(IRepository<User>), typeof(UserRepository));
            //services.AddScoped(typeof(IRepository<Purchase>), typeof(PurchaseRepository));
            services.AddScoped<IRepository<Purchase>,PurchaseRepository>();
            services.AddScoped<IRepository<Chapter>,ChapterRepository>();
            services.AddScoped(typeof(IRepository<Course>), typeof(CourseRepository));
            services.AddScoped(typeof(IRepository<Views>), typeof(ViewsRepository));
            return services;
       }
    }
}

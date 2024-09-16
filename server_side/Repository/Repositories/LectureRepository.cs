using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SP_connect;
using System.Data.SqlClient;


namespace Repository.Repositories
{
    public class LectureRepository : IRepository<Lecture>
    {
        private readonly IContext context;
        private readonly SP_connect.SP_connect _sP_Connect = new SP_connect.SP_connect("server=NOA;database=myDataBase_1;trusted_connection=true;TrustServerCertificate=true;");

        public LectureRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Lecture> Add(Lecture entity)
        {
            await this.context.Lectures.AddAsync(entity);
            await this.context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            this.context.Lectures.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task DeleteAll()
        {
            foreach (Lecture item in this.context.Lectures)
            {
                await Delete(item.Id);
            }
            await this.context.save();
        }

        public async Task< List<Lecture>> GetAll()
        {
            return await this.context.Lectures.ToListAsync();
        }

        public async Task<Lecture> GetById(int id)
        {
            var lecture = await this.context.Lectures.FirstOrDefaultAsync(x => x.Id == id);
            var reader = _sP_Connect.use_SP(id, "@LectureId", "spGetCoursesByLecture");
            List<Course> results = new List<Course>();
            while (reader.Read())
            {
                results.Add(new Course()
                {
                    Id=(int)reader[9],
                    Name = (string)reader[0],
                    Description = (string)reader[1],
                    DatePublished = (DateTime)reader[2],
                    Price_first = (int)reader[3],
                    Price_now = (int)reader[4],
                    Duration = (int)reader[6],
                    Picture = (string)reader[7],
                    Video = (string)reader[8],
                    LectureId = 0
                }) ;
            }
            reader.Close();
            lecture.Courses = results;
            foreach (var course in lecture.Courses)
            {
                course.Categories=new List<Category>();
                var reader_categories = _sP_Connect.use_SP(course.Id, "@courseId", "spGetCategoriesForCourse");
                List<Category> results_categories = new List<Category>();
                while (reader_categories.Read())
                {
                    results_categories.Add(new Category()
                    {
                        Id =(int)reader_categories[0] , 
                        Name = (string)reader_categories[1],
                        Description = (string)reader_categories[2],
                        Picture= (string)reader_categories[3],
                    });
                }
                reader_categories.Close();
                course.Categories=results_categories;
            }
            return lecture;

        }

        public async Task<Lecture> Update(Lecture entity)
        {
            var lecture = await this.context.Lectures.FirstOrDefaultAsync(x => x.Id == entity.Id);
            lecture.FirstName = entity.FirstName;
            lecture.LastName = entity.LastName;
            lecture.Description = entity.Description;
            lecture.Email = entity.Email;
            if(entity.Picture.Length<200 )
                lecture.Picture = entity.Picture;
            await context.save();
            return lecture;
        }
    }
}

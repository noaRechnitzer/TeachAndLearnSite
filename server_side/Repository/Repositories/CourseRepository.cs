using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using SP_connect;

namespace Repository.Repositories
{
    public class CourseRepository : IRepository<Course>
    {
        private readonly IContext context;
        private readonly SP_connect.SP_connect _sP_Connect = new SP_connect.SP_connect("server=NOA;database=myDataBase_1;trusted_connection=true;TrustServerCertificate=true;");

        public CourseRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Course> Add(Course entity)
        {

            await this.context.Courses.AddAsync(entity);
            await this.context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            this.context.Courses.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task DeleteAll()
        {
            foreach (Course item in this.context.Courses)
            {
                await Delete(item.Id);
            }
            await this.context.save();
        }

        public async Task<List<Course>> GetAll()
        {
            var lst= await this.context.Courses.Include(c => c.Lecture).Include(ca=>ca.Categories).ToListAsync();
            return lst;
        }
        public async Task<Course> GetById(int id)
        {
            var course = await context.Courses.Include(c=>c.Lecture).FirstOrDefaultAsync(x => x.Id == id);
            var reader = _sP_Connect.use_SP(id, "@courseId", "spGetCategoriesForCourse");
            List<Category> results = new List<Category>();
            while (reader.Read())
            {
                results.Add(new Category()
                {
                    Id= (int)reader[0],
                    Name = (string)reader[1],
                    Description = (string)reader[2],
                    Picture = (string)reader[3]
                });
            }
            reader.Close();
            course.Categories = new HashSet<Category>();
            course.Categories= results;
            course.Lecture.Courses=new List<Course>();
            return course;
        }

        public async Task<Course> Update(Course entity)
        {
            var course = await context.Courses.FirstOrDefaultAsync(x => x.Id == entity.Id);
            course.Name = entity.Name;
            course.Description = entity.Description;
            course.Price_now = entity.Price_now;
            course.DatePublished = entity.DatePublished;
            if(course.Picture.Length<200)
                course.Picture=entity.Picture;
            course.Video = entity.Video;
            course.Categories = entity.Categories;
            await context.save();
            return course;
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class CategoryRepository : IRepository<Category>
    {
        private readonly IContext context;
        public CategoryRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Category> Add(Category entity)
        {
            await this.context.Categories.AddAsync(entity);
            await context.save();
            return entity;
        }

        public async Task Delete(int id)
        { 
            this.context.Categories.Remove(await GetById(id));
            await context.save();
        }

        public async Task DeleteAll()
        {
            foreach(Category item in this.context.Categories)
            {
                await Delete(item.Id);
            }
            await context.save();
        }

        public async Task<List<Category>> GetAll()
        {

            var lst = await context.Categories.Include(c => c.Courses).ThenInclude(c => c.Lecture).ToListAsync();
            foreach (var category in lst)
            {
                foreach (var course in category.Courses)
                {
                    course.Categories = null;
                    
                }
            }
            return lst; 
        }

        public async Task<Category> GetById(int id)
        {
            var category= await context.Categories.Include(c=>c.Courses).ThenInclude(c=>c.Lecture).FirstOrDefaultAsync(x => x.Id == id);
            return category;
        }

        public async Task<Category> Update(Category entity)
        {
            Category category=await GetById(entity.Id);
             category.Name = entity.Name;
            category.Description = entity.Description;
            category.Picture= entity.Picture;
            await context.save();
            return category;
        }
    }
}

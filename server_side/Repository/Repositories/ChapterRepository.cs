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
    public class ChapterRepository : IRepository<Chapter>
    {
        private readonly IContext context;
        public ChapterRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Chapter> Add(Chapter entity)
        {
            await context.Chapters.AddAsync(entity);
            await context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            context.Chapters.Remove(await GetById(id));
            await context.save();
        }

        public async Task DeleteAll()
        {
            foreach (Chapter item in this.context.Chapters)
            {
                await Delete(item.Id);
            }
            await context.save();
        }

        public async Task<List<Chapter>> GetAll()
        {
            return await context.Chapters.ToListAsync();        
        }

        public async Task<Chapter> GetById(int id)
        {
            return await context.Chapters.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Chapter> Update(Chapter entity)
        {
            Chapter chapter=await GetById(entity.Id);
            chapter.Name = entity.Name;
            chapter.Description = entity.Description;
            chapter.video = entity.video;
            chapter.Duration = entity.Duration;
            await context.save();
            return chapter;
        }
    }
}

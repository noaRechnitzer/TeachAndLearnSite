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
    public class ViewsRepository:IRepository<Views>
    {
        private readonly IContext context;
        public ViewsRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<Views> Add(Views entity)
        {
            await this.context.Views.AddAsync(entity);
            await context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            this.context.Views.Remove(await GetById(id));
            await context.save();
        }

        public async Task DeleteAll()
        {
            foreach (Views item in this.context.Views)
            {
                await Delete(item.Id);
            }
            await context.save();
        }

        public async Task<List<Views>> GetAll()
        {

            return await context.Views.ToListAsync();

        }

        public async Task<Views> GetById(int id)
        {
            var lst= await context.Views.FirstOrDefaultAsync(x => x.Id == id);
            return lst;
        }

        public async Task<Views> Update(Views entity)
        {
            Views views = await GetById(entity.Id);
            views.CategoryId = entity.CategoryId;
            views.UserId = entity.UserId;
            views.NumView= entity.NumView;
            await context.save();
            return views;
        }


    }
}

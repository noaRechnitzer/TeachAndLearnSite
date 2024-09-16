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
    public class ResponseRepository : IRepository<Response>
    {
        private readonly IContext context;
        public ResponseRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Response> Add(Response entity)
        {
            await this.context.Responses.AddAsync(entity) ;
            await this.context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            this.context.Responses.Remove(await GetById(id));
            await this.context.save();  
        }

        public async Task  DeleteAll()
        {
            foreach (Response item in this.context.Responses)
            {
               await Delete(item.Id);
            }
            await this.context.save();
        }

        public async Task <List<Response>> GetAll()
        {
            return await this.context.Responses.ToListAsync();
        }

        public async Task<Response> GetById(int id)
        {
            return await this.context.Responses.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Response> Update(Response entity)
        {
            Response response =await GetById(entity.Id);
            response.Description = entity.Description;
            await context.save();
            // 2
            return response;
        }
    }
}

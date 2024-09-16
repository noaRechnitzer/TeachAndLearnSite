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
    public class UserRepository : IRepository<User>
    {
        private readonly IContext context;
        public UserRepository(IContext context)
        {
            this.context = context;
        }
        public async Task<User> Add(User entity)
        {
            await this.context.Users.AddAsync(entity);
            await context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            this.context.Users.Remove(await GetById(id));
            await context.save();
        }

        public async Task  DeleteAll()
        {
            foreach (User item in this.context.Users)
            {
                await Delete(item.Id);
            }
            await context.save();
        }

        public async Task<List<User>> GetAll()
        {
            return await this.context.Users.Include(v=>v.Views).ToListAsync();
        }

        public async Task<User> GetById(int id)
        {
            return await this.context.Users.Include(p => p.Purchase_history).ThenInclude(p => p.Course).Include(v=>v.Views).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User> Update(User entity)
        {
            User user=await GetById(entity.Id);
            user.FirstName = entity.FirstName;
            user.LastName = entity.LastName;
            user.Email = entity.Email;
            await context.save();
            // 6
            return user;
        }
    }
}

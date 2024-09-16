using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    internal class PurchaseRepository : IRepository<Purchase>
    {
        private readonly IContext context;
        public PurchaseRepository(IContext context)
        {
            this.context = context;
        }

        public async Task<Purchase> Add(Purchase entity)
        {
            await this.context.Purchases.AddAsync(entity);
            await this.context.save();
            return entity;
        }

        public async Task Delete(int id)
        {
            this.context.Purchases.Remove(await GetById(id));
            await this.context.save();
        }

        public async Task DeleteAll()
        {
            foreach (Purchase item in this.context.Purchases)
            {
                await Delete(item.Id);
            }
            await this.context.save();
        }

        public async Task<List<Purchase>> GetAll()
        {
            var lst= await this.context.Purchases.Include(p=>p.Course).Include(p=>p.User).ToListAsync();
            return lst;
        }

        public async Task<Purchase> GetById(int id)
        {
            return await this.context.Purchases.Include(p=>p.Course).Include(p=>p.User).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Purchase> Update(Purchase entity)
        {
            Purchase purchase =await this.GetById(entity.Id);
            purchase.StartDate = entity.StartDate;
            purchase.EndDate = entity.EndDate;
            purchase.SubscriptionsType = entity.SubscriptionsType;
            purchase.Sum=entity.Sum;
            await context.save();
            // 2
            return purchase;
        }
    }
}

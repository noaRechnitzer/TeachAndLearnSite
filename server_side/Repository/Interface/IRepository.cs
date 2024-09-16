using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interface
{
    public interface IRepository<T> where T : class
    {
        public Task<T> Add(T entity);
        public Task<T> Update(T entity);
        public Task Delete(int id);
        public Task DeleteAll();
        public Task<T> GetById(int id);
        public Task<List<T>> GetAll();
        
    }
}

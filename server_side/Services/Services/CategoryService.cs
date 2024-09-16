using AutoMapper;
using Common.Dtos;
using Repository.Entity;
using Repository.Interface;
using Services.Interfaes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class CategoryService : IServices<CategoryDto>
    {
        private readonly IRepository<Category> repository;
        private readonly IMapper mapper;
        public CategoryService(IRepository<Category> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<CategoryDto> Add(CategoryDto entity)
        {
            return mapper.Map<CategoryDto>(await repository.Add(mapper.Map<Category>(entity)));
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await repository.DeleteAll();
        }

        public async Task<List<CategoryDto>> GetAll()
        {
            return mapper.Map<List<CategoryDto>>(await repository.GetAll());
        }

        public async Task<CategoryDto> GetById(int id)
        {
            return mapper.Map<CategoryDto>(await repository.GetById(id));
        }

        public async Task<CategoryDto> Update(CategoryDto entity)
        {
            return mapper.Map<CategoryDto>(await repository.Update(mapper.Map<Category>(entity)));
        }
    }
}

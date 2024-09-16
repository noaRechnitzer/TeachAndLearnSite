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
    public class ViewsService : IServices<ViewsDto>
    {
        private readonly IRepository<Views> repository;
        private readonly IMapper mapper;
        public ViewsService(IRepository<Views> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<ViewsDto> Add(ViewsDto entity)
        {
            return mapper.Map<ViewsDto>(await repository.Add(mapper.Map<Views>(entity)));
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await repository.DeleteAll();
        }

        public async Task<List<ViewsDto>> GetAll()
        {
            Dispose();
           return mapper.Map<List<ViewsDto>>(await repository.GetAll());
        }

        public async Task<ViewsDto> GetById(int id)
        {
            return mapper.Map<ViewsDto>(await repository.GetById(id));
        }

        public async Task<ViewsDto> Update(ViewsDto entity)
        {
            return mapper.Map<ViewsDto>(await repository.Update(mapper.Map<Views>(entity)));
        }
        public void Dispose()
        {
            int num = 0;
            num = num+10;
        }
    }
}

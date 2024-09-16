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
    public class ResponceService : IServices<ResponseDto>
    {
        private readonly IRepository<Response> repository;
        private readonly IMapper mapper;
        public ResponceService(IRepository<Response> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<ResponseDto> Add(ResponseDto entity)
        {
            return mapper.Map<ResponseDto>(await this.repository.Add(mapper.Map<Response>(entity)));
        }

        public async Task Delete(int id)
        {
            await this.repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await this.repository.DeleteAll();
        }

        public async Task<List<ResponseDto>> GetAll()
        {
            return mapper.Map<List<ResponseDto>>(await this.repository.GetAll());
        }

        public async Task<ResponseDto> GetById(int id)
        {
            return mapper.Map<ResponseDto>(await this.repository.GetById(id));
        }

        public async Task<ResponseDto> Update(ResponseDto entity)
        {
            return mapper.Map<ResponseDto>(await this.repository.Update(mapper.Map<Response>(entity)));
        }
    }
}

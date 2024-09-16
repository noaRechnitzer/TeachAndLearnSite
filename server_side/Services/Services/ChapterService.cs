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
    public class ChapterService : IServices<ChapterDto>
    {
        private readonly IRepository<Chapter> repository;
        public readonly IMapper mapper;
        public ChapterService(IRepository<Chapter> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<ChapterDto> Add(ChapterDto entity)
        {
            return mapper.Map<ChapterDto>(await this.repository.Add(mapper.Map<Chapter>(entity)));
        }

        public async Task Delete(int id)
        {
            await repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await repository.DeleteAll();
        }

        public async Task<List<ChapterDto>> GetAll()
        {
            return mapper.Map<List<ChapterDto>>(await repository.GetAll());
        }

        public async Task<ChapterDto> GetById(int id)
        {
            return mapper.Map<ChapterDto>(await repository.GetById(id));
        }

        public async Task<ChapterDto> Update(ChapterDto entity)
        {
            return mapper.Map<ChapterDto>(await repository.Update(mapper.Map<Chapter>(entity)));
        }
    }
}

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
    public class LectureService: IServicesExtention<LectureDto>
    {
        private readonly IRepository<Lecture> repository;
        private readonly IMapper mapper;

        public LectureService(IRepository<Lecture> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }

        public async Task<LectureDto> Add(LectureDto entity)
        {
            return mapper.Map<LectureDto>(await this.repository.Add(mapper.Map<Lecture>(entity)));
        }

        public async Task Delete(int id)
        {
            await this.repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await this.repository.DeleteAll();
        }

        public async Task<List<LectureDto>> GetAll()
        {
            return mapper.Map<List<LectureDto>>(await this.repository.GetAll());
        }

        public async Task<LectureDto> GetById(int id)
        {
            return mapper.Map<LectureDto>(await this.repository.GetById(id));
        }

        public async Task<string> GetUserByUserEmail(string userEmail, string password)
        {
            var lst = await this.repository.GetAll();
            foreach (var item in lst)
            {
                if (item.Email == userEmail)
                {
                    if (item.Password == password)
                        return item.Id.ToString();
                    else
                        return "password";
                }
            }
            return "email";

        }
        public async Task<LectureDto> Update(LectureDto entity)
        {
            return mapper.Map<LectureDto>(await this.repository.Update(mapper.Map<Lecture>(entity)));
        }

    }
}

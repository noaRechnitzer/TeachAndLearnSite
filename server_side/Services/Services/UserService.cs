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
    public class UserService : IServicesExtention<UserDto>
    {
        private readonly IRepository<User> repository;
        private readonly IMapper mapper;
        public UserService(IRepository<User> repository, IMapper mapper)
        {
            this.repository = repository;
            this.mapper = mapper;
        }
        public async Task<UserDto> Add(UserDto entity)
        {
            return mapper.Map<UserDto>(await this.repository.Add(mapper.Map<User>(entity)));
        }

        public async Task Delete(int id)
        {
            await this.repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await this.repository.DeleteAll();
        }

        public async Task<List<UserDto>> GetAll()
        {            
            return mapper.Map<List<UserDto>>(await this.repository.GetAll());
        }

        public async Task<UserDto> GetById(int id)
        {
            return mapper.Map<UserDto>(await this.repository.GetById(id));
        }

        public async Task<string> GetUserByUserEmail(string userEmail, string password)
        {
            var lst=await this.repository.GetAll();
            foreach (var item in lst)
            {
                if(item.Email == userEmail)
                {
                    if (item.Password == password)
                        return item.Id.ToString();
                    else
                        return "password";
                }
            }
            return "email";
           
        }

        public async Task<UserDto> Update(UserDto entity)
        {
            return mapper.Map<UserDto>(await this.repository.Update(mapper.Map<User>(entity)));
        }
    }
}

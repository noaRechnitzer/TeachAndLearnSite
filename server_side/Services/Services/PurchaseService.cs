using AutoMapper;
using Common.Dtos;
using Repository.Entity;
using Repository.Interface;
using Services.Interfaes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class PurchaseService : IServices<PurchaseDto>
    {
        private readonly IRepository<Purchase> repository;
        private readonly IRepository<User> repository_user;
        private readonly IRepository<Course> repository_course;
        private readonly IEmailSender _emailSender;
        private readonly IMapper mapper;
        public PurchaseService(IRepository<Purchase> repository, IMapper mapper, IRepository<User> repository_user, IRepository<Course> repository1,IEmailSender emailSender)
        {
            this.repository = repository;
            this.mapper = mapper;
            this.repository_user = repository_user;
            this.repository_course = repository1;
            _emailSender = emailSender; 
        }

        public async Task<PurchaseDto> Add(PurchaseDto entity)
        {
            // check SubscriptionsType
            DateTime now = DateTime.UtcNow;
            entity.StartDate = now;
            DateTime date=entity.StartDate.AddMonths(1);
            if(entity.SubscriptionsType.ToString()=="semiannual")
                date =entity.StartDate.AddMonths(3);
            if (entity.SubscriptionsType.ToString() == "forever")
                date = entity.StartDate.AddMonths(6);
            entity.EndDate = date;
            var newPurchase = await this.repository.Add(mapper.Map<Purchase>(entity));
            var current_purchase=await this.repository.GetById(newPurchase.Id);

            if (current_purchase != null)
            {
                //send email
                var receiver = current_purchase.User.Email;
                var subject = "Thank you for purchasing from us!";
                var message = "To complete payment, enter the link";
                //your data function then if have to send mail?
                _emailSender.SendEmailForPayment(receiver, subject, message);
            }
            return mapper.Map<PurchaseDto>(newPurchase);
        }

        public async Task Delete(int id)
        {
            await this.repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await this.repository.DeleteAll();
        }

        public async Task<List<PurchaseDto>> GetAll()
        {
            return mapper.Map<List<PurchaseDto>>(await this.repository.GetAll());
        }

        public async Task<PurchaseDto> GetById(int id)
        {
            return mapper.Map<PurchaseDto>(await this.repository.GetById(id));
        }

        public async Task<PurchaseDto> Update(PurchaseDto entity)
        {
            return mapper.Map<PurchaseDto>(await this.repository.Update(mapper.Map<Purchase>(entity)));
        }
    }
}

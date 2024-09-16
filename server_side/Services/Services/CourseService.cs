using AutoMapper;
using Common.Dtos;
using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
using Services.Interfaes;
using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;
using SP_connect;

namespace Services.Services
{
    public class CourseService : IServices<CourseDto>
    {
        private readonly IRepository<Course> repository;
        private readonly IRepository<Category> repositoryCategory;
        private readonly IRepository<User> repositoryUser;
        private readonly IEmailSender _emailSender;
        private readonly IMapper mapper;
        public CourseService(IRepository<Course> repository, IRepository<Category> repositoryCategory,IRepository<User> repositoryUser, IEmailSender _emailSender, IMapper mapper)
        {
            this.repository = repository;
            this.repositoryCategory = repositoryCategory;
            this.repositoryUser = repositoryUser;
            this._emailSender = _emailSender;
            this.mapper = mapper;
        }

        public async Task<CourseDto> Add(CourseDto entity)
        {
            Course c = mapper.Map<Course>(entity);
            DateTime now = DateTime.UtcNow;
            c.DatePublished = now;
            c.Categories = new HashSet<Category>();
            foreach (var item in entity.CategoriesId)
            {
                var category = await repositoryCategory.GetById(item);
                if (category != null)
                {
                    c.Categories.Add(category);
                }
            }

            //send email to popular users
            var users=await repositoryUser.GetAll();
            int popular = 0,max=0,flag=0;    
            foreach (var item in users)
            {
                if (item.Views.Count>0)
                {

                    // find max  CategoryId
                    foreach (var item1 in item.Views)
                    {
                    if (item1.NumView>max)
                    {
                        max = item1.NumView;
                        popular = item1.CategoryId;
                    }
                    else
                    {
                        if (item1.NumView == max)
                        {
                            foreach (var item2 in c.Categories)
                            {
                                if (item2.Id==max)
                                {
                                    flag = 1;
                                }
                            }
                            if (flag==0)
                            {
                                popular = item1.CategoryId;
                            }
                        }
                    }
                }
                    foreach (var item1 in c.Categories)
                    {
                        if (item1.Id == popular)
                        {
                            //send email
                            var receiver = item.Email;
                            var subject = "new course you would like";
                            var message = "For login confirmation, send us a return email";
                            string htmlBody = readData("D:\\part B\\c#\\‏‏project 7.2\\project\\HTML\\NewCourse.html");
                            htmlBody = htmlBody.Replace("{title}", c.Name);
                            htmlBody = htmlBody.Replace("{description}", c.Description);
                            _emailSender.SendEmailAsync(receiver, subject, message, htmlBody);
                        }
                    }
                }
                popular = 0; max = 0; flag = 0;
            }
            var new_courseWithCategories = await this.repository.Add(c);
            var new_course = mapper.Map<CourseDto>(new_courseWithCategories);
            return new_course;
        }
        public string readData(string urlPage)
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string pat = Path.GetDirectoryName(Uri.UnescapeDataString(uri.Path));
            string full = Path.Combine(pat, urlPage);
            string htmlBody = "" ;
            using (var reader = new StreamReader(full))
            {
                htmlBody = reader.ReadToEnd();
            }
;
            return htmlBody;
        }
        public async Task Delete(int id)
        {
            await this.repository.Delete(id);
        }

        public async Task DeleteAll()
        {
            await repository.DeleteAll();
        }

        public async Task<List<CourseDto>> GetAll()
        {
            var lstWithC = await repository.GetAll();
            var lst=mapper.Map<List<CourseDto>>(lstWithC);
            return lst;
        }

        public async Task<CourseDto> GetById(int id)
        {
            var c= mapper.Map<CourseDto>(await repository.GetById(id));
            return c;   
        }

        public async Task<CourseDto> Update(CourseDto entity)
        {
            Course c = mapper.Map<Course>(entity);
            c.Categories = new HashSet<Category>();
            foreach (var item in entity.CategoriesId)
            {
                var category = await repositoryCategory.GetById(item);
                if (category != null)
                {
                    c.Categories.Add(category);
                }
            }
            return mapper.Map<CourseDto>(await this.repository.Update(c));

        }
    }
}

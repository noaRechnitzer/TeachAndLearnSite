using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Repository.Entity;
using Services.Interfaes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IServices<CategoryDto> services;
        public CategoryController(IServices<CategoryDto> services)
        {
            this.services = services;
        }
        // GET: api/<CategoryController>
        [HttpGet]
        public async Task<List<CategoryDto>> Get()
        {
            try
            {
            var lst=await services.GetAll();
                foreach (var category in lst)
                {
                    if (category.Picture.Length <= 40)
                    {
                    category.Picture = GetImage(category.Picture);
                }
                    foreach (var course in category.Courses)
                    {
                        if (course.Picture.Length <= 40)
                        {
                            course.Picture = GetImage(course.Picture);
                        }
                        if (course.Lecture.Picture.Length <= 40)
                        {

                            course.Lecture.Picture = GetImage(course.Lecture.Picture);
                        }
                    }
                }
                return lst;
            }catch (Exception ex) {
                Console.WriteLine(ex.Message);
            }
            return null;
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public async Task<CategoryDto> Get(int id)
        {
            var category= await services.GetById(id);
            if (category.Picture.Length<200)
                category.Picture = GetImage(category.Picture);
            foreach (var course in category.Courses)
            {
                if (course.Picture.Length<=200)
                {
                    course.Picture=GetImage(course.Picture);
                }
                if (course.Lecture.Picture.Length <= 200)
                {
                    course.Lecture.Picture = GetImage(course.Lecture.Picture);
                }
            }  

            return category;
        }

        [HttpGet("getImage/{ImageUrl}")]
        public string GetImage(string ImageUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory + "/images/", ImageUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }

        // POST api/<CategoryController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] CategoryDto value)
        {
            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + value.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                value.FileImage.CopyTo(fs);
                fs.Close();
            }
            value.Picture = value.FileImage.FileName;
            return Ok(await services.Add(value));
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] CategoryDto value)
        {
            if (value.FileImage != null)
            {
                var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + value.FileImage.FileName);
                using (FileStream fs = new FileStream(myPath, FileMode.Create))
                {
                    value.FileImage.CopyTo(fs);
                    fs.Close();
                }
                value.Picture = value.FileImage.FileName;
            }

            return Ok(await services.Update(value));
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseController : ControllerBase
    {
        private readonly IServices<CourseDto> services;
        public CourseController(IServices<CourseDto> services)
        {
            this.services = services;                   
        }
        // GET: api/<CourseController>
        [HttpGet]
        public async Task<List<CourseDto>> Get()
        {
            var lst= await services.GetAll();
            foreach (var course in lst)
            {
                if(course.Picture.Length<200)
                    course.Picture = GetImage(course.Picture);
                foreach (var category in course.Categories)
                {
                    if (category.Picture.Length < 40)
                    {
                        category.Picture = GetImage(category.Picture);
                    }
                }
            }
            return lst;
        }

        // GET api/<CourseController>/5
        [HttpGet("{id}")]
        public async Task<CourseDto> Get(int id)
        {
            var course= await services.GetById(id);
            if(course.Picture.Length<200)
                course.Picture = GetImage(course.Picture);
            return course;
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

        [HttpGet("getVideo/{VideoUrl}")]
        public string GetVideo(string VideoUrl)
        {
            var path = Path.Combine(Environment.CurrentDirectory + "/Video/", VideoUrl);
            byte[] bytes = System.IO.File.ReadAllBytes(path);
            string imageBase64 = Convert.ToBase64String(bytes);
            string image = string.Format("data:image/jpeg;base64,{0}", imageBase64);
            return image;
        }
        // POST api/<CourseController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] CourseDto value)
        {
            
            if (value.FileVideo == null || value.FileVideo.Length <= 0)
            {
                return BadRequest("No file uploaded");
            }
            var filePath = Path.Combine(Environment.CurrentDirectory+ "/Video/"+ value.FileVideo.FileName);
            using (FileStream fs = new FileStream(filePath, FileMode.Create))
            {
                value.FileVideo.CopyTo(fs);
                fs.Close(); 
            }
            value.Video = value.FileVideo.FileName;

            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + value.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                value.FileImage.CopyTo(fs);
                fs.Close();
            }
            value.Picture = value.FileImage.FileName;    
            return Ok(await services.Add(value));
        }

        // PUT api/<CourseController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] CourseDto value)
        {
            if (value.FileVideo != null)
            {
                if (value.FileVideo == null || value.FileVideo.Length <= 0)
                {
                    return BadRequest("No file uploaded");
                }
                var filePath = Path.Combine(Environment.CurrentDirectory + "/Video/" + value.FileVideo.FileName);
                using (FileStream fs = new FileStream(filePath, FileMode.Create))
                {
                    value.FileVideo.CopyTo(fs);
                    fs.Close();
                }
                value.Video = value.FileVideo.FileName;
            }

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

        // DELETE api/<CourseController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

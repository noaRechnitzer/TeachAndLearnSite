using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LectureController : ControllerBase
    {
        private  readonly IServicesExtention<LectureDto> services;
        public LectureController(IServicesExtention<LectureDto> services)
        {
             this.services = services;
        }
        // GET: api/<LectureController>
        [HttpGet]
        public async Task<List<LectureDto>> Get()
        {
            try
            {
                var lst = await services.GetAll();
                foreach (var lecture in lst)
                {
                    lecture.Password = "*****";
                    if(lecture.Picture.Length<200)
                        lecture.Picture = GetImage(lecture.Picture);
                }
                return lst;
            }
            catch (Exception ex) { 
                Console.WriteLine(ex.Message);
            }
            return null;

        }

        [HttpPost("lecture/Login")]
        public async Task<IActionResult> GetByUserEmail([FromForm] LectureDto lecture)
        {
            string res = await services.GetUserByUserEmail(lecture.Email, lecture.Password);
            if (res == "email")
                return BadRequest("worng email");
            else
                            if (res == "password")
                return BadRequest("worng password");
            return Ok(res);
        }

        // GET api/<LectureController>/5
        [HttpGet("{id}")]
        public async Task<LectureDto> Get(int id)
        {
            var lecture= await services.GetById(id);
            lecture.Password = "*****";
            if (lecture.Picture.Length < 200)
                lecture.Picture = GetImage(lecture.Picture);
            foreach (var course in lecture.Courses)
            {
                if (course.Picture.Length < 200)
                    course.Picture = GetImage(course.Picture);
            }
            return lecture;
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

        // POST api/<LectureController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] LectureDto value)
        {
            //if()
            var myPath = Path.Combine(Environment.CurrentDirectory + "/Images/" + value.FileImage.FileName);
            using (FileStream fs = new FileStream(myPath, FileMode.Create))
            {
                value.FileImage.CopyTo(fs);
                fs.Close();
            }
            value.Picture = value.FileImage.FileName;
            return Ok(await services.Add(value));
        }

        // PUT api/<LectureController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] LectureDto value)
        {
            if (value.FileImage!=null)
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

        // DELETE api/<LectureController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViewsController : ControllerBase
    {
        private readonly IServices<ViewsDto> services;
        private IConfiguration configuration;

        public ViewsController(IServices<ViewsDto> services,IConfiguration configuration)
        {
            this.services = services;
            this.configuration = configuration;
        }

        // GET: api/<ViewsController>
        [HttpGet]
        public async Task<List<ViewsDto>> Get()
        {
            return await services.GetAll();
        }

        // GET: api/<ViewsController>
        [HttpGet("user/{userId}")]
        //public async Task<List<ViewsDto>> GetPerUser(int userId)
        //{
        //    var views= await services.GetAll();
        //     List<ViewsDto> viewsPerUser=new List<ViewsDto>();
        //    foreach (var item in views)
        //    {
        //        if (item.UserId == userId)
        //            viewsPerUser.Add(item);
        //    }
        //    return views;
        //}

        // GET api/<ViewsController>/5
        [HttpGet("{id}")]
        public async Task<ViewsDto> Get(int id)
        {
            return await services.GetById(id);
        }

        // POST api/<ViewsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] ViewsDto value)
        {
            return Ok(await services.Add(value));
        }

        // PUT api/<ViewsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] ViewsDto value)
        {
            return Ok(await services.Update(value));
        }

        // DELETE api/<ViewsController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

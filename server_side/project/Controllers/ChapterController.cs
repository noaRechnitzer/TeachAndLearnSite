using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChapterController : ControllerBase
    {
        public readonly IServices<ChapterDto> services;
        public ChapterController(IServices<ChapterDto> services)
        {
            this.services = services;
        }

        // GET: api/<ChapterController>
        [HttpGet]
        public async Task<List<ChapterDto>> Get()
        {
            return await services.GetAll();
        }

        // GET api/<ChapterController>/5
        [HttpGet("{id}")]
        public async Task<ChapterDto> Get(int id)
        {
            return await services.GetById(id);
        }

        // POST api/<ChapterController>
        [HttpPost]
        public async Task Post([FromBody] ChapterDto value)
        {
            await services.Add(value);
        }

        // PUT api/<ChapterController>/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] ChapterDto value)
        {
            await services.Update(value);
        }

        // DELETE api/<ChapterController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

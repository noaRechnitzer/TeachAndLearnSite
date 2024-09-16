using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaes;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResponseController : ControllerBase
    {
        private readonly IServices<ResponseDto> services;
        public ResponseController(IServices<ResponseDto> services)
        {
            this.services = services;
        }
        // GET: api/<ResponseController>
        [HttpGet]
        public async Task<List<ResponseDto>> Get()
        {
            return await services.GetAll();
        }

        // GET api/<ResponseController>/5
        [HttpGet("{id}")]
        public async Task<ResponseDto> Get(int id)
        {
            return await services.GetById(id);
        }

        // POST api/<ResponseController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ResponseDto value)
        {
            return Ok(await services.Add(value));
        }

        // PUT api/<ResponseController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ResponseDto value)
        {
            return Ok(await services.Update(value));
        }

        // DELETE api/<ResponseController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

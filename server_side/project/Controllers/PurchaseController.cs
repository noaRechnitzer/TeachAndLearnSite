using Common.Dtos;
using Microsoft.AspNetCore.Mvc;
using Services.Interfaes;
using System.Security.Cryptography.X509Certificates;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {
        public readonly IServices<PurchaseDto> services;
        public PurchaseController(IServices<PurchaseDto> services)
        {
            this.services = services;
        }

        // GET: api/<PurchaseController>
        [HttpGet]
        public async Task<List<PurchaseDto>> Get()
        {
            return await services.GetAll();
        }

        // GET api/<PurchaseController>/5
        [HttpGet("{id}")]
        public async Task<PurchaseDto> Get(int id)
        {
            return await services.GetById(id);
        }

        // POST api/<PurchaseController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PurchaseDto value)
        {
            var res=await services.Add(value);

            return Ok(res);
            //return Ok(await services.Add(value));
        }

        // PUT api/<PurchaseController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] PurchaseDto value)
        {
            return Ok(await services.Add(value));
        }

        // DELETE api/<PurchaseController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await services.Delete(id);
        }
    }
}

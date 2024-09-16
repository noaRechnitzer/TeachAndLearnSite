using Microsoft.AspNetCore.Mvc;
using Repository.Entity;
using Services.Interfaes;
using System.Reflection;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailSendController : ControllerBase
    {
        private readonly IEmailSender _emailSender;
        public EmailSendController(IEmailSender emailSender)
        {
            _emailSender = emailSender;
        }
        // GET: api/<EmailSendController>
        [HttpGet]
        public IEnumerable<string> Get()
        {

            return new string[] { "value1", "value2" };

        }

        // GET api/<EmailSendController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        [HttpGet("getEmail/{EmailString}")]
        public void GetEmail(string email)
        {
            var receiver = email;
            //var receiver = "yr700700@gmail.com";
            var subject = "Website login confirmation";
            var message = "For login confirmation, send us a return email";
            string htmlBody = readData("D:\\part B\\c#\\‏‏project 7.2\\project\\HTML\\NewCourse.html");
            //your data function then if have to send mail?
            htmlBody = htmlBody.Replace("{title}", "title");
            htmlBody = htmlBody.Replace("{description}", "description");
            _emailSender.SendEmailAsync(receiver, subject, message, htmlBody);
        }
        private string readData(string urlPage)
        {
            string codeBase = Assembly.GetExecutingAssembly().CodeBase;
            UriBuilder uri = new UriBuilder(codeBase);
            string pat = Path.GetDirectoryName(Uri.UnescapeDataString(uri.Path));
            string full = Path.Combine(pat, urlPage);
            string htmlBody = "";
            using (var reader = new StreamReader(full))
            {
                htmlBody = reader.ReadToEnd();
            }
;
            return htmlBody;
        }
        // POST api/<EmailSendController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EmailSendController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EmailSendController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {

        }
    }
}

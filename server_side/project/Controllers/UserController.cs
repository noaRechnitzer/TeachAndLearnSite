using Common.Dtos;
using DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services.Interfaes;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IServicesExtention<UserDto> services;
        private IConfiguration configuration;
        public UserController(IServicesExtention<UserDto> services,IConfiguration configuration)
        {
            this.services = services;
            this.configuration = configuration;
        }

        private async Task<UserDto> Authenticate(string username, string password)
        {
            var res = await services.GetUserByUserEmail(username, password);
            var user = await services.GetById(int.Parse(res));
            return user;
            //if (res!= "email"&&res!= "password")
            //{
            //
            //}
            //throw new Exception();
        }

        private string Generate(UserDto user)
        {
            //מפתח להצפנה-מהקובץ appsettings
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            //אלגוריתם להצפנה
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);
            //אלו שדות להצפין
            //מה עם הרשימות??
            var claims = new[] {
            new Claim(ClaimTypes.Email,user.Email),
            new Claim(ClaimTypes.GivenName,user.FirstName),
            new Claim(ClaimTypes.Surname,user.LastName),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()), // החלף את Id עם תכונת מזהה המשתמש בפועל

            };
            var token = new JwtSecurityToken(configuration["Jwt:Issuer"], configuration["Jwt:Audience"],
                claims,
                //תוקף ההזמנה
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        //שליפת המשתמש מהטוקן
        private UserDto GetCurrentUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
                var UserClaim = identity.Claims;

                    return new UserDto()
                    {
                        FirstName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
                        Email = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
                        LastName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value,
                    };

            //var identity = HttpContext.User.Identity as ClaimsIdentity;
            //if (identity != null)
            //{
            //    var userId = identity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
            //    var UserClaim = identity.Claims;
            //    if (userId != null)
            //    {
            //        return new UserDto()
            //        {
            //            Id = int.Parse(userId),
            //            //Id=UserClaim.FirstOrDefault(x=>x.Type==ClaimTypes.NameIdentifier)?.Value,
            //            FirstName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
            //            Email = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value,
            //            LastName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value,
            //        };
            //    }
            //}
            //return null;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<List<UserDto>> Get()
        {
            var lst= await services.GetAll();
            foreach (var user in lst)
            {
                user.Password = "*****";
            }
            return lst;
        }


        [HttpPost("user/Login")]
        public async Task<IActionResult> GetByUserEmail([FromForm] UserDto user)
        {
            string res= await services.GetUserByUserEmail(user.Email,user.Password);
            //if (res == "ok")
            //    return Ok("you are conect");
            //else
            //    if (res == "password")
            //        return BadRequest("worng password");
            //return BadRequest("worng email");
            if (res == "email")
                return BadRequest("worng email");
            else
                 if (res == "password")
                     return BadRequest("worng password");

            return Ok(res);
        }
        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<UserDto> Get(int id)
        {
            try
            {
                var user= await services.GetById(id);
                foreach (var purchase in user.Purchase_history)
                {
                    if (purchase.Course != null){
                        if (purchase.Course.Picture.Length<200)
                        {
                        purchase.Course.Picture = GetImage(purchase.Course.Picture);
                        }
                    }
                }
                user.Password = "*****";
                return user;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return null;

        }

        [HttpGet("user")]
        public IActionResult SellerAndAdminEndPoint()
        {
            var currentUser = GetCurrentUser();
            return Ok($"Hi {currentUser.FirstName} {currentUser.LastName} i am a {currentUser.Email}");        }

        // POST api/<UserController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] UserDto user)
        {
            //
            return Ok(await services.Add(user));
        }

        // POST api/<UserController>
        [HttpPost("/login")]
        //[Authorize(Roles = "user")]
        public async Task<IActionResult> Login([FromForm] UserDto user)
        {
            var user1 = await Authenticate(user.Email, user.Password);
            if (user1 != null) 
            {
                var token = Generate(user1);
                return Ok(token);
            }

            return NotFound("User not found");
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] UserDto value)
        {           
            return Ok(await services.Update(value));
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {            
            await services.Delete(id);
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
    }
}

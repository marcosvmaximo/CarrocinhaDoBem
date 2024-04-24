using CarrocinhaDoBem.Api.Context;
using CarrocinhaDoBem.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace CarrocinhaDoBem.Api.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly DataContext _context;

        public UserController(UserManager<User> userManager, DataContext context)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser(UserRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                Phone = request.Phone,
                Address = request.Address,
                UserType = request.UserType,
                BirthDate = request.BirthDate
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                return Ok();
            }
            else
            {
                return StatusCode(500, result.Errors);
            }
        }
    }
}

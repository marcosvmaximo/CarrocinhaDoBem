using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Models;
using webApi.Services;
using CarrocinhaDoBem.Api.Context;
using Microsoft.Extensions.Logging;


namespace webApi.Controllers
{
    [ApiController]
    [Route("api/userController")] 
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IPasswordService _service;
        private readonly ILogger<UserController> _logger;

        public UserController(DataContext context, IPasswordService service, ILogger<UserController> logger)
        {
            _context = context;
            _service = service;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound("Usuário não encontrado.");
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("Usuário não encontrado.");

            user.UserName = updatedUser.UserName;
            user.Email = updatedUser.Email;
            user.Phone = updatedUser.Phone;
            user.Address = updatedUser.Address;
            user.UserType = updatedUser.UserType;
            user.BirthDate = updatedUser.BirthDate;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return Ok("Usuário atualizado com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound("Usuário não encontrado.");

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("Usuário deletado com sucesso.");
        }
    }
}
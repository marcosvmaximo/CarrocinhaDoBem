using CarrocinhaDoBem.Api.Context;
using CarrocinhaDoBem.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarrocinhaDoBem.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly ApplicationDbContext _context;

    public AuthController(UserManager<User> userManager, ApplicationDbContext context)
    {
        _context = context;
        _userManager = userManager;
    }
    
    [HttpGet]
    public async Task<IActionResult> ObterTodosUsuarios()
    {
        return Ok(_context.Users.ToList());
    }    
    
    [HttpGet("{id:int}")]
    public async Task<IActionResult> ObterUsuarioPorId(int id)
    {
        var user = await _context.Users.FirstOrDefaultAsync(x => x.Id.Equals(id));
        if (user == null) return NotFound();
        
        return Ok(user);
    }

    [HttpPost]
    public async Task<IActionResult> CadastrarUsuario(UserRequest userRequest)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (userRequest.Password != userRequest.ConfirmPassword)
        {
            ModelState.AddModelError("Confirmar Senha", "A senha e a confirmação de senha não correspondem.");
            return BadRequest(ModelState);
        }

        var user = new User
        {
            UserName = userRequest.UserName,
            Email = userRequest.Email,
            Password = userRequest.Password,
            Address = "",
            Avatar = new byte[1],
            Phone = "",
            UserType = ""
        };

        var result = _userManager.CreateAsync(user);
        if (!result.Result.Succeeded)
        {
            return BadRequest(result.Result.Errors);
        }

        // Retornar a resposta de criação bem-sucedida
        return CreatedAtAction(nameof(ObterUsuarioPorId), new { id = user.Id }, user);
    }
}
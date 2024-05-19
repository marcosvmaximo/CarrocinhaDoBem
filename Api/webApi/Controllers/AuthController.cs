using System.Runtime.InteropServices.ComTypes;
using CarrocinhaDoBem.Api.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Models;
using webApi.Services;

namespace webApi.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
  private readonly DataContext _context;
  private readonly IPasswordService _service;

  public AuthController(DataContext context, IPasswordService service)
  {
    _context = context;
    _service = service;
  }

  [HttpPost("register")]
  public async Task<IActionResult> Register(CreateUserRequest request)
  {
    if (!ModelState.IsValid) return BadRequest("Usuário ou senha inválida.");
    if(request.Password != request.ConfirmPassword) return BadRequest("Senhas não coincidem.");

    var user = new User
    {
      Email = request.Email,
      UserName = request.UserName
    };

    user.PasswordHash = _service.HashPassword(user, request.Password);

    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return Created("", null);
  }

  [HttpPost("login")]
  public async Task<IActionResult> Login(LoginUserRequest request)
  {
    var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == request.Email);

    if (user == null) return BadRequest("Email ou senha inválidos.");

    var isPasswordValid = _service.VerifyPassword(user, request.Password);

    return isPasswordValid ? Ok(new {sucess = true, message = "Login realizado com sucesso."}) : BadRequest("Email ou senha inválidos.");
  }
}

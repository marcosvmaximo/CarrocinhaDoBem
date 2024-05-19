using Microsoft.AspNetCore.Identity;
using webApi.Models;

namespace webApi.Services;

public class PasswordService : IPasswordService
{
  private readonly PasswordHasher<User> _passwordHasher;

  public PasswordService()
  {
    _passwordHasher = new PasswordHasher<User>();
  }

  public string HashPassword(User user, string password)
  {
    return _passwordHasher.HashPassword(user, password);
  }

  public bool VerifyPassword(User user, string password)
  {
    var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
    return result == PasswordVerificationResult.Success;
  }
}

public interface IPasswordService
{
  string HashPassword(User user, string password);
  bool VerifyPassword(User user, string password);
}

using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Models;
using CarrocinhaDoBem.Api.Context;
using Microsoft.Extensions.Logging;


namespace webApi.Controllers
{
    [ApiController]
    [Route("api/adoptions")]
    public class AdoptionController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<AdoptionController> _logger;

        public AdoptionController(DataContext context, ILogger<AdoptionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var adoptions = await _context.Adoptions
                .Include(a => a.Animal)
                .Include(a => a.User)
                .ToListAsync();
            return Ok(adoptions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var adoption = await _context.Adoptions
                .Include(a => a.Animal)
                .Include(a => a.User)
                .FirstOrDefaultAsync(a => a.Id == id);
            if (adoption == null)
            {
                return NotFound("Adoção não encontrada.");
            }

            return Ok(adoption);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AdoptionRequest request)
        {
            var user = await _context.Users.FindAsync(request.UserId);
            if (user == null)
            {
              return NotFound("Usuário não encontrado.");
            }

            var animal = await _context.Animals.FindAsync(request.AnimalId);
            if (animal == null)
            {
              return NotFound("Animais não encontrado.");
            }

            var adoption = new Adoption
            {
                UserId = request.UserId,
                AnimalId = request.AnimalId,
                AdoptionDate = DateTime.Now,
                AdoptionStatus = true
            };

            animal.Status = false;

            _context.Adoptions.Add(adoption);
            _context.Animals.Update(animal);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Adoptions.Add(adoption);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = adoption.Id }, adoption);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var adoption = await _context.Adoptions.FindAsync(id);
            if (adoption == null)
            {
                return NotFound("Adoção não encontrada.");
            }

            _context.Adoptions.Remove(adoption);
            await _context.SaveChangesAsync();

            return Ok("Adoção deletada com sucesso.");
        }
    }
}

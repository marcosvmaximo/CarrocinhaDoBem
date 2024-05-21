using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Models;
using CarrocinhaDoBem.Api.Context;
using Microsoft.Extensions.Logging;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/animals")]
    public class AnimalController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<AnimalController> _logger;

        public AnimalController(DataContext context, ILogger<AnimalController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var animals = await _context.Animals.Include(a => a.Institution).ToListAsync();
            return Ok(animals);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var animal = await _context.Animals.Include(a => a.Institution).FirstOrDefaultAsync(a => a.Id == id);
            if (animal == null)
            {
                return NotFound("Animal não encontrado.");
            }

            return Ok(animal);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] Animal animal, IFormFile animalPic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (animalPic != null)
            {
                using (var ms = new MemoryStream())
                {
                    await animalPic.CopyToAsync(ms);
                    animal.AnimalPic = ms.ToArray();
                }
            }

            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = animal.Id }, animal);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] Animal updatedAnimal, IFormFile animalPic)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound("Animal não encontrado.");
            }

            animal.InstitutionId = updatedAnimal.InstitutionId;
            animal.PetSize = updatedAnimal.PetSize;
            animal.AnimalAge = updatedAnimal.AnimalAge;
            animal.RescueDate = updatedAnimal.RescueDate;
            animal.AnimalName = updatedAnimal.AnimalName;
            animal.Breed = updatedAnimal.Breed;
            animal.Color = updatedAnimal.Color;
            animal.AnimalType = updatedAnimal.AnimalType;

            if (animalPic != null)
            {
                using (var ms = new MemoryStream())
                {
                    await animalPic.CopyToAsync(ms);
                    animal.AnimalPic = ms.ToArray();
                }
            }

            _context.Animals.Update(animal);
            await _context.SaveChangesAsync();

            return Ok("Animal atualizado com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null)
            {
                return NotFound("Animal não encontrado.");
            }

            _context.Animals.Remove(animal);
            await _context.SaveChangesAsync();

            return Ok("Animal deletado com sucesso.");
        }
    }
}

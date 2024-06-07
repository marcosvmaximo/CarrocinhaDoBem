using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Models;
using CarrocinhaDoBem.Api.Context;
using Microsoft.Extensions.Logging;
using webApi.Models.Requests;
using webApi.Models.Responses;

namespace webApi.Controllers
{
    [ApiController]
    [Route("api/animals")]
    public class AnimalController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<AnimalController> _logger;
        private readonly IMapper _mapper;

        public AnimalController(DataContext context, ILogger<AnimalController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] string sortBy = "rescueDate", [FromQuery] string sortOrder = "asc")
        {
          var query = _context.Animals.Include(a => a.Institution).AsQueryable();

          query = (sortBy.ToLower(), sortOrder.ToLower()) switch
          {
            ("name", "desc") => query.OrderByDescending(a => a.Name),
            ("name", "asc") => query.OrderBy(a => a.Name),
            ("rescueDate", "desc") => query.OrderByDescending(a => a.RescueDate),
            ("rescueDate", "asc") => query.OrderBy(a => a.RescueDate),
            ("birthDate", "desc") => query.OrderByDescending(a => a.BirthDate),
            ("birthDate", "asc") => query.OrderBy(a => a.BirthDate),
            (_, "desc") => query.OrderByDescending(a => a.Id),
            (_, "asc") => query.OrderBy(a => a.Id)
          };

          var animals = await query.ToListAsync();
          return Ok(_mapper.Map<IEnumerable<AnimalResponse>>(animals));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var animal = await _context.Animals.Include(a => a.Institution).FirstOrDefaultAsync(a => a.Id == id);
            if (animal == null)
            {
                return NotFound("Animal não encontrado.");
            }

            return Ok(_mapper.Map<AnimalResponse>(animal));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm]AnimalRequest request, IFormFile animalPic)
        {
            var animal = _mapper.Map<Animal>(request);
            

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
        public async Task<IActionResult> Update(int id, [FromBody] AnimalRequest updatedAnimal, IFormFile animalPic)
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
            animal.BirthDate = updatedAnimal.BirthDate;
            animal.RescueDate = updatedAnimal.RescueDate;
            animal.Name = updatedAnimal.Name;
            animal.Sex = updatedAnimal.Sex;
            animal.Breed = updatedAnimal.Breed;
            animal.Species = updatedAnimal.Species;

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

        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetAnimalImage(int id)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null || animal.AnimalPic == null || animal.AnimalPic.Length == 0)
            {
                return NotFound("Imagem não encontrada para o animal.");
            }

            // Defina o Content-Type do retorno para indicar que é uma imagem
            return File(animal.AnimalPic, "image/jpeg"); // Altere para o tipo de imagem correto, se necessário
        }
    }
}

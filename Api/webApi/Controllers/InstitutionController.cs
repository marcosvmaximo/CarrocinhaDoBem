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
    [Route("api/institutions")]
    public class InstitutionController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<InstitutionController> _logger;

        public InstitutionController(DataContext context, ILogger<InstitutionController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var institutions = await _context.Institutions.ToListAsync();
            return Ok(institutions);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var institution = await _context.Institutions.FindAsync(id);
            if (institution == null)
            {
                return NotFound("Instituição não encontrada.");
            }

            return Ok(institution);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Institution institution)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Institutions.Add(institution);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = institution.Id }, institution);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Institution updatedInstitution)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var institution = await _context.Institutions.FindAsync(id);
            if (institution == null)
            {
                return NotFound("Instituição não encontrada.");
            }

            institution.InstitutionCNPJ = updatedInstitution.InstitutionCNPJ;
            institution.InstitutionName = updatedInstitution.InstitutionName;

            _context.Institutions.Update(institution);
            await _context.SaveChangesAsync();

            return Ok("Instituição atualizada com sucesso.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var institution = await _context.Institutions.FindAsync(id);
            if (institution == null)
            {
                return NotFound("Instituição não encontrada.");
            }

            _context.Institutions.Remove(institution);
            await _context.SaveChangesAsync();

            return Ok("Instituição deletada com sucesso.");
        }
    }
}
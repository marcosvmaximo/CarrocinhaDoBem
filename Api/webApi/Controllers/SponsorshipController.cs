using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Models;
using CarrocinhaDoBem.Api.Context;

namespace webApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SponsorshipController : ControllerBase
    {
        private readonly DataContext _context;

        public SponsorshipController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
public async Task<ActionResult<IEnumerable<Sponsorship>>> GetSponsorships([FromQuery] int? userId = null)
{
    IQueryable<Sponsorship> query = _context.Sponsorships.Include(s => s.Animal);

    if (userId.HasValue)
    {
        query = query.Where(x => x.UserId == userId);
    }

    var sponsorships = await query.ToListAsync();

    if (!sponsorships.Any())
    {
        return NotFound("Nenhum patrocínio encontrado.");
    }

    return Ok(sponsorships);
}


        [HttpGet("{id}")]
        public async Task<ActionResult<Sponsorship>> GetSponsorship(int id)
        {
            var sponsorship = await _context.Sponsorships.FindAsync(id);

            if (sponsorship == null)
            {
                return NotFound("Patrocínio não encontrado.");
            }

            return Ok(sponsorship);
        }



        [HttpPost]
        public async Task<ActionResult<Sponsorship>> PostSponsorship(Sponsorship sponsorship)
        {
            _context.Sponsorships.Add(sponsorship);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSponsorship", new { id = sponsorship.Id }, sponsorship);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSponsorship(int id)
        {
            var sponsorship = await _context.Sponsorships.FindAsync(id);
            if (sponsorship == null)
            {
                return NotFound("Patrocínio não encontrado para exclusão.");
            }

            _context.Sponsorships.Remove(sponsorship);
            await _context.SaveChangesAsync();

            return Ok("Patrocínio excluído com sucesso.");
        }

        private bool SponsorshipExists(int id)
        {
            return _context.Sponsorships.Any(e => e.Id == id);
        }
    }
}

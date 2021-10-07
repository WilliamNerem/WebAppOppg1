using EF_2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Gruppeoppgave1.Controllers
{
    [Route("[controller]/[action]")]

    public class StrekningController:ControllerBase
    {
        private readonly DB _db;

        private ILogger<StrekningController> _log;

        public StrekningController(DB db, ILogger<StrekningController> log)
        {
            _db = db;
            _log = log;
        }

        public List<Strekning> index()
        {
            return _db.Strekning.ToList();
        }

        public async Task<ActionResult> HentAlle()
        {
            List<Strekning> alleStrekninger = await _db.Strekning.Select(k => new Strekning
            {
                Id = k.Id,
                Navn = k.Navn,
                Pris = k.Pris
            }).ToListAsync();
            return Ok(alleStrekninger);
        }

        public async Task<ActionResult> HentEn(int id)
        {
            Strekning enStrekning = await _db.Strekning.FindAsync(id);
            if (enStrekning == null)
            {
                _log.LogInformation("Fant ikke strekningen");
                return NotFound("Fant ikke strekningen");
            }
            _log.LogInformation("Hentet strekning " + enStrekning.Navn); // For å vise at vi behersker logging, litt overflødig
            return Ok(enStrekning);
        }
    }
}

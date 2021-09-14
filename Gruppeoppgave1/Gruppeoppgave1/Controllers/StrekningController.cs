using EF_2.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        public StrekningController(DB db)
        {
            _db = db;
        }

        public List<Strekning> index()
        {
            return _db.Strekning.ToList();
        }

        public async Task<List<Strekning>> HentAlle()
        {
            try
            {
                List<Strekning> alleStrekninger = await _db.Strekning.Select(k => new Strekning
                {
                    Id = k.Id,
                    Navn = k.Navn,
                    Pris = k.Pris
                }).ToListAsync();
                return alleStrekninger;
            }
            catch
            {
                return null;
            }
        }

        public async Task<Strekning> HentEn(int id)
        {
            Strekning enStrekning = await _db.Strekning.FindAsync(id);
            var hentetStrekning = new Strekning()
            {
                Id = enStrekning.Id,
                Navn = enStrekning.Navn,
                Pris = enStrekning.Pris
            };
            return hentetStrekning;
        }
    }
}

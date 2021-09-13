using EF_2.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KundeOrdre.Controllers
{
    [Route("[controller]/[action]")]

    public class HomeController:ControllerBase
    {
        private readonly DB _db;

        public HomeController(DB db)
        {
            _db = db;
        }

        public List<Strekning> index()
        {
            return _db.Strekning.ToList();
        }
    }
}

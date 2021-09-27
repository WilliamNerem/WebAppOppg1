using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EF_2.Models
{
    public class DBInit
    {
        public static void init(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {

                var context = serviceScope.ServiceProvider.GetService<DB>();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();

                var nyStrekning1 = new Strekning
                {
                    Navn = "Larvik - Hirtshals",
                    Pris = 600
                };

                var nyStrekning2 = new Strekning
                {
                    Navn = "Larvik - Strømstad",
                    Pris = 400
                };

                var nyStrekning3 = new Strekning
                {
                    Navn = "Larvik - Kiel",
                    Pris = 750
                };
              
                

                context.Strekning.Add(nyStrekning1);
                context.Strekning.Add(nyStrekning2);
                context.Strekning.Add(nyStrekning3);
                context.SaveChanges();
            }
        }
    }
}
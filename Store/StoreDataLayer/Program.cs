using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using StoreDataLayer.Data;
using System;

namespace StoreDataLayer
{
    public class Program
    {
        /// <summary>
        /// Seeds the dabatase
        /// </summary>
        /// <param name="args"></param>
        public static void Main(string[] args)
        {
            var host = BuildWebHost(args);
            // Get the dataabase instance from the dependency injection container.
            // Call the seed method, passing to it the context
            // Dispose the context when the seed method is done
            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                try
                {
                    var context = services.GetRequiredService<StoreDbContext>();
                    DbIntializer.Initialize(context);
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogError(ex, "An error occured while seeding the database.");
                }
            }
            host.Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .Build();
    }
}

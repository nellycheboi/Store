using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Store.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Http;

namespace Store
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        /// <summary>
        /// Add services to the container
        /// Configures app to provide token in a cookie called XSRF-TOKEN
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            // Configure the antiforgery service to look for a header named X - XSRF - TOKEN
            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");
            services.AddDbContext<StoreDbContext>(options =>
             options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddMvc();
        }

        // https://docs.microsoft.com/en-us/aspnet/core/security/anti-request-forgery
        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// configures the app to provide XSRF-TOKEN
        /// </summary>
        /// <param name="app"></param>
        /// <param name="antiforgery"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IAntiforgery antiforgery, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            // Configure your app to provide a token in a cookie called XSRF-TOKEN
            app.Use(next => _context =>
            {
                string path = _context.Request.Path.Value;
                if (
                    path.Contains("/api")
                   )
                {
                    // We can send the request token as a JavaScript-readable cookie, 
                    // and Angular will use it by default.
                    var tokens = antiforgery.GetAndStoreTokens(_context);
                    _context.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken,
                        new CookieOptions() { HttpOnly = false });
                }

                return next(_context);
            });
            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}

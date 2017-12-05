using Microsoft.EntityFrameworkCore;
using StoreDataLayer.Models;

namespace StoreDataLayer.Data
{
    public class StoreDbContext : DbContext
    {
        /// <summary>
        /// Database Context is registered with dependency injection during application startup.
        ///     @see StartUp's ConfigureServices method in ../Startup.cs
        /// calls the base's(DbContext) class construct passing in the injected options.
        /// </summary>
        /// <param name="options"></param>
        public StoreDbContext(DbContextOptions<StoreDbContext> options) : base(options) { }

        /// <summary>
        /// Entity set corresponding to the Users table. Containing an unordered list(set) of User entries
        /// </summary>
        public DbSet<User> Users { get; set; }

        /// <summary>
        /// Entity set corresping to the Orders table. Containing an unordered list of Order entries.
        /// Orders could be ommited as User Entity reference them. Entity Framework includes any references implicitly.
        /// Orders, is however left here for clarity.
        /// </summary>
        public DbSet<Order> Orders { get; set; }

        /// <summary>
        /// Among the many things that could be included here is overriding the table's name:
        ///     i.e modelBuilder.Entity<Order>().ToTable("Order");
        ///     I prefer the default Plurazation from the associated model. Resulting in tables: Users and Orders
        ///     
        /// 
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<Order>().ToTable("Order");
            
        }
    }


}

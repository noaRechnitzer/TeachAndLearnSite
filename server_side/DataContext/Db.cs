using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interface;
namespace DataContext
{
    public class Db : DbContext, IContext
    {
        public DbSet<Category> Categories { get ; set ; }

        public DbSet<Lecture> Lectures { get ; set ; }
        public DbSet<Response> Responses { get ; set ; }
        public DbSet<User> Users { get ; set ; }
        public DbSet<Purchase> Purchases { get ; set ; }
        public DbSet<Chapter> Chapters { get ; set ; }

        public DbSet<Course> Courses { get ; set; }

        public DbSet<Views> Views { get; set; }
        public async Task save()
        {
           await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=NOA;database=myDataBase_1;trusted_connection=true;TrustServerCertificate=true;");
        }
    }
}

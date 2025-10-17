using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Data
{
    public partial class EGamingDbContext : DbContext
    {
        public EGamingDbContext() { }

        public EGamingDbContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseSqlServer("Server=db29698.public.databaseasp.net; Database=db29698; User Id=db29698; Password=h@9D2aS-eY_7; Encrypt=False; MultipleActiveResultSets=True;");

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Category>().HasData(
                  new Category { Id = 1, CategoryName = "Action" },
                  new Category { Id = 2, CategoryName = "Indie" },
                  new Category { Id = 3, CategoryName = "Adventure" },
                  new Category { Id = 4, CategoryName = "RPG" },
                  new Category { Id = 5, CategoryName = "Strategy" },
                  new Category { Id = 6, CategoryName = "Shooter" },
                  new Category { Id = 7, CategoryName = "Casual" },
                  new Category { Id = 8, CategoryName = "Simulation" },
                  new Category { Id = 9, CategoryName = "Puzzle" },
                  new Category { Id = 10, CategoryName = "Arcade" },
                  new Category { Id = 11, CategoryName = "Platformer" },
                  new Category { Id = 12, CategoryName = "Massively Multiplayer" },
                  new Category { Id = 13, CategoryName = "Racing" },
                  new Category { Id = 14, CategoryName = "Sports" },
                  new Category { Id = 15, CategoryName = "Fighting" }
              );

            // Category
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(c => c.Id);
                entity.Property(c => c.CategoryName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.HasMany(c => c.Games)
                      .WithOne(g => g.Category)
                      .HasForeignKey(g => g.CategoryID)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // OperateCategory
            modelBuilder.Entity<OperateCategory>(entity =>
            {
                entity.HasKey(o => o.Id);
                entity.Property(o => o.OperateCategoryName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.HasMany(o => o.Games)
                      .WithOne(g => g.OperateCategory)
                      .HasForeignKey(g => g.OperateCategoryID)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            // Games
            modelBuilder.Entity<Games>(entity =>
            {
                entity.HasKey(g => g.Id);
                entity.Property(g => g.Name)
                      .IsRequired()
                      .HasMaxLength(150);

                entity.Property(g => g.Description)
                      .HasMaxLength(500);

                entity.Property(g => g.Rating)
                      .IsRequired();

                entity.HasMany(g => g.Images)
                      .WithOne(i => i.Games)
                      .HasForeignKey(i => i.GamesID)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // Images
            modelBuilder.Entity<Images>(entity =>
            {
                entity.HasKey(i => i.Id);
                entity.Property(i => i.ImageUrl)
                      .IsRequired()
                      .HasMaxLength(250);
            });

            // Users
            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.FullName)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.Email)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(u => u.Password)
                      .IsRequired()
                      .HasMaxLength(200);
            });

            // FavoritGames (Many-to-Many)
            modelBuilder.Entity<FavoritGames>(entity =>
            {
                entity.HasKey(f => f.Id);

                entity.HasOne(f => f.Games)
                      .WithMany()
                      .HasForeignKey(f => f.GameId)
                      .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(f => f.Users)
                      .WithMany(u => u.FavoritGames)
                      .HasForeignKey(f => f.UserId)
                      .OnDelete(DeleteBehavior.Cascade);
            });
        }

        // DbSets
        public DbSet<Category> Categories { get; set; }
        public DbSet<Games> Games { get; set; }
        public DbSet<Images> Images { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<FavoritGames> FavoritGames { get; set; }
        public DbSet<OperateCategory> OperateCategories { get; set; }
    }
}

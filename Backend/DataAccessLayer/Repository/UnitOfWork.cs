using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using DataAccessLayer.Data;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Repository
{
    //Scaffold-DbContext "Server=.;Database=E_Commerce;Integrated Security=SSPI;TrustServerCertificate=True;" Microsoft.EntityFrameworkCore.SqlServer -OutputDir Entities -ContextDir Data -Context ECommerceDbContext -Force
    public class UnitOfWork : IUnitOfWork
    {

        public IGenericRepository<Users> Users {get; private set;}

        public IGenericRepository<Games> Games {get; private set;}

        public IGenericRepository<FavoritGames> FavoritGames {get; private set;}

        public IGenericRepository<OperateCategory> OperateCategory {get; private set;}

        public IGenericRepository<Category> Category {get; private set;}

        public IGenericRepository<Images> Images {get; private set;}


        private readonly EGamingDbContext _context;
        public UnitOfWork(EGamingDbContext context)
        {
            _context = context;
            Games = new GenericRepository<Games>(_context);
            Users = new GenericRepository<Users>(_context);
            FavoritGames = new GenericRepository<FavoritGames>(_context);
            OperateCategory = new GenericRepository<OperateCategory>(_context);
            Category = new GenericRepository<Category>(_context);
            Images = new GenericRepository<Images>(_context);
        }


        public async Task<bool> Complete()
        {
            int affectedRow = await _context.SaveChangesAsync();

            return affectedRow > 0;
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}

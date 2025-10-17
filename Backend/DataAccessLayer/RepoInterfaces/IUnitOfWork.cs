using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using DataAccessLayer.Entities;

namespace DataAccessLayer.RepoInterfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Users> Users { get; }
        IGenericRepository<Games> Games { get; }
        IGenericRepository<FavoritGames> FavoritGames { get; }
        IGenericRepository<OperateCategory> OperateCategory { get; }
        IGenericRepository<Category> Category { get; }
        IGenericRepository<Images> Images { get; }
        Task<bool> Complete();
    }
}

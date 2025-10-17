using Azure;
using BusinessLayer.Mapper;
using DataAccessLayer.RepoInterfaces;
using DataAccessLayer.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Entities;

namespace BusinessLayer.Services
{
    public class GamesService : IGames
    {
     
        private readonly IUnitOfWork _unitOfWork;


        public GamesService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        public async Task<List<BigGamesDto>> GetAllGames(int[] categories, int page, int gamePerPage)
        {
            var games = await _unitOfWork.Games.GetAll(p => (categories == null || categories.Length == 0 || categories.Contains(p.CategoryID)), (page - 1) * gamePerPage, gamePerPage, new[] { "Images" });

            var dtos = GameMapper.ToDtos(games).OrderByDescending(p => p.Rating).ToList();

            return dtos;
        }

        public async Task<List<BigGamesDto>> GetAllGamesBySearch(string Name, int page, int gamePerPage)
        {
           
            var games = await _unitOfWork.Games.GetAll(p => (string.IsNullOrEmpty(Name) || p.Name.Contains(Name)) , (page - 1) * gamePerPage, gamePerPage, new[] {"Images"});
        
            var dtos = GameMapper.ToDtos(games).OrderByDescending(p => p.Rating).ToList(); ;
            
            return dtos;
        }

        public async Task<GamesDto> GetGame(int ID)
        {
        var game = await _unitOfWork.Games.GetById(ID, new[] { "Images" });
            var dto = GameMapper.ToDto(game);
            return dto;
        }

        public async Task<List<BigGamesDto>> GetTopGames(int OperateCategory, int page, int gamePerPage)
        {
            var games = await _unitOfWork.Games.GetAll(p => p.OperateCategoryID == OperateCategory, (page - 1) * gamePerPage, gamePerPage, new[] { "Images" });

            var dtos = GameMapper.ToDtos(games).OrderByDescending(p => p.Rating).ToList(); ;

            return dtos;
        }

        public async Task<List<BigGamesDto>> TopGames(int page, int gamePerPage)
        {
            var games = await _unitOfWork.Games.GetAll((page - 1) * gamePerPage, gamePerPage, new[] { "Images" });
            
            var dtos = GameMapper.ToDtos(games);

            return dtos.OrderByDescending(p => p.Rating).ToList();
        }
    }
}

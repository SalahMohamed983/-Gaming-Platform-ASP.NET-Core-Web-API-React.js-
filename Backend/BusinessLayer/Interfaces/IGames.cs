using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public interface IGames
    {
        Task<List<BigGamesDto>> GetAllGames(int[] categories, int page, int gamePerPage);
        Task<List<BigGamesDto>> GetAllGamesBySearch(string Name, int page, int gamePerPage);
        Task<List<BigGamesDto>> GetTopGames(int OperateCategory, int page, int gamePerPage);
        Task<List<BigGamesDto>> TopGames(int page, int gamePerPage);
        Task<GamesDto> GetGame(int ID);
        
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public interface IFavoritGames
    {
        Task<BigGamesDto> Add(FavoritGamesDto favoritGames);
        Task<bool> Delete(int Id);
        Task<List<BigGamesDto>> GetAllFavoritGames(int userId);
    }
}

// GamingApi.Controllers/FavoritGamesController.cs
using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GamingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class FavoritGamesController : ControllerBase
    {
        private readonly IFavoritGames _favoritGames;
        public FavoritGamesController(IFavoritGames favoritGames)
        {
            _favoritGames = favoritGames;
        }

        [HttpGet("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BigGamesDto>>> GetAllFavoritGames(int userId)
        {
            var list = await _favoritGames.GetAllFavoritGames(userId);

            if (list == null || list.Count == 0)
                return NotFound("Not Found Favorite Games!");

            return Ok(list);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<BigGamesDto>> AddFavoritGame(FavoritGamesDto favoritGamesDto)
        {
            favoritGamesDto.Id = 0;
            var newGameDto = await _favoritGames.Add(favoritGamesDto);

            if (newGameDto != null)
                return Ok(newGameDto); 

            return BadRequest("Could not added Favorit Game");
        }

        [HttpDelete("{ID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteFavoritGame(int ID)
        {
            if (ID < 0)
                return BadRequest("Parameter Are Wrong");


            if (await _favoritGames.Delete(ID))
                return Ok("Delete Successfully!");
            else
                return NotFound("Products Not Found!");

        }

    }
}
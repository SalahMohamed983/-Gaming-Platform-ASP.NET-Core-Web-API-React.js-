using DataAccessLayer.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GamingApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class GamesController : ControllerBase
    {
        private readonly IGames _games;
        public GamesController(IGames games)
        {
            _games = games;
        }


        [HttpPut("ByCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BigGamesDto>>> GetAllGamesByCategory(int[] categories, int page, int gamePerPage)
        {
            

            var gamesList = await _games.GetAllGames(categories, page, gamePerPage);

            if (gamesList.Count == 0)
                return NotFound("Not Found Brands!");
            
            
                return Ok(gamesList);
        }
        [HttpGet("BySearch")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BigGamesDto>>> GetAllGamesBySearch(string Name, int page, int gamePerPage)
        {
            var gamesList = await _games.GetAllGamesBySearch( Name, page, gamePerPage);

            if (gamesList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(gamesList);
        }
        [HttpGet("{ID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BigGamesDto>>> GetGame(int ID)
        {
            var gamesList = await _games.GetGame(ID);

            if (gamesList == null)
                return NotFound("Not Found Brands!");
            
            return Ok(gamesList);
        }
        [HttpGet("ByOperatingCategory")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BigGamesDto>>> GetTopGames(int OperateCategory, int page, int gamePerPage)
        {
            var gamesList = await _games.GetTopGames(OperateCategory, page, gamePerPage);

            if (gamesList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(gamesList);
        }

        [HttpGet("TopGames")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<List<BigGamesDto>>> TopGames(int page, int gamePerPage)
        {
            var gamesList = await _games.TopGames(page, gamePerPage);

            if (gamesList.Count == 0)
                return NotFound("Not Found Brands!");

            return Ok(gamesList);
        }
    }
}

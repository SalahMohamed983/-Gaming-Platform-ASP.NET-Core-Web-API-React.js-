using Riok.Mapperly.Abstractions;
using DataAccessLayer.Entities;
using System.Linq;

namespace BusinessLayer.Mapper
{
    //==================== Games ====================
    [Mapper]
    public partial class GameMapper
    {
        // يولد الكود الأساسي
        public static partial GamesDto ToDtoBase(Games game);
        public static partial List<BigGamesDto> ToDtosBase(List<Games> games);
        public static partial Games ToEntity(GamesDto dto);

        // تعديل يدوي لإضافة اللينك الكامل
        public static GamesDto ToDto(Games game)
        {
            if (game == null)
                return null;

            var dto = ToDtoBase(game);

            if (game.Images != null)
            {
                dto.Images = game.Images
                    .Select(p => new ImagesDto
                    {
                        ImageUrl = $"http://sahgaming.runasp.net/GameImages/{p.ImageUrl}"
                    })
                    .ToList();
            }

            return dto;
        }

        public static List<BigGamesDto> ToDtos(List<Games> games)
        {
            if (games == null)
                return new List<BigGamesDto>();

            var dtos = ToDtosBase(games);

            for (int i = 0; i < games.Count && i < dtos.Count; i++)
            {
                var game = games[i];
                var dto = dtos[i];
                if (game.Images != null && dto.Images != null)
                {
                    dto.Images = game.Images
                        .Select(p => new ImagesDto
                        {
                            ImageUrl = $"https://sahgaming.runasp.net/GameImages/{p.ImageUrl}"
                        })
                        .ToList();
                }
        }

            return dtos;
        }
    }

    //==================== Categories ====================
    [Mapper]
    public static partial class CategoryMapper
    {
        public static partial CategoryDto ToDtoBase(Category category);
        public static partial List<CategoryDto> ToDtosBase(List<Category> categories);

        public static CategoryDto ToDto(Category category)
        {
            if (category == null) return null;
            return ToDtoBase(category);
        }

        public static List<CategoryDto> ToDtos(List<Category> categories)
        {
            if (categories == null) return new List<CategoryDto>();
            return ToDtosBase(categories);
        }
    }

    //==================== Favorit Games ====================
    [Mapper]
    public static partial class FavoritGamesMapper
    {
        //[MapProperty(nameof(FavoritGames.Games.Id), nameof(BigGamesDto.Id))]
        [MapProperty(nameof(FavoritGames.Games.Name), nameof(BigGamesDto.Name))]
        [MapProperty(nameof(FavoritGames.Games.Rating), nameof(BigGamesDto.Rating))]
        [MapProperty(nameof(FavoritGames.Games.CategoryID), nameof(BigGamesDto.CategoryID))]
        [MapProperty(nameof(FavoritGames.Games.OperateCategoryID), nameof(BigGamesDto.OperateCategoryID))]
        [MapProperty(nameof(FavoritGames.Games.Images), nameof(BigGamesDto.Images))]
        public static partial BigGamesDto ToBigDtoBase(FavoritGames favorit);

        public static partial List<BigGamesDto> ToDtosBase(List<FavoritGames> favorits);
        public static partial FavoritGamesDto ToDtoBase(FavoritGames favorit);
        public static partial FavoritGames ToEntity(FavoritGamesDto dto);

        public static BigGamesDto ToBigDto(FavoritGames favorit)
        {
            if (favorit == null) return null;

            var dto = ToBigDtoBase(favorit);

            if (favorit.Games?.Images != null)
            {
                dto.Images = favorit.Games.Images
                    .Select(p => new ImagesDto
                    {
                        ImageUrl = $"https://sahgaming.runasp.netGameImages/{p.ImageUrl}"
                    })
                    .ToList();
            }

            return dto;
        }

        public static List<BigGamesDto> ToDtos(List<FavoritGames> favorits)
        {
            if (favorits == null)
                return new List<BigGamesDto>();

            var dtos = ToDtosBase(favorits);

            foreach (var (fav, dto) in favorits.Zip(dtos, (f, d) => (f, d)))
            {
                if (fav.Games?.Images != null && dto.Images != null)
                {
                    dto.Images = fav.Games.Images
                        .Select(p => new ImagesDto
                        {
                            ImageUrl = $"https://sahgaming.runasp.net/GameImages/{p.ImageUrl}"
                        })
                        .ToList();
                }
            }

            return dtos;
        }

        public static FavoritGamesDto ToDto(FavoritGames favorit)
        {
            if (favorit == null)
                return null;

            return ToDtoBase(favorit);
        }
    }

    //==================== Users ====================
    [Mapper]
    public static partial class UsersMapper
    {
        public static partial UsersDto ToDtoBase(Users user);
        public static partial Users ToEntity(UserAddDto dto);

        public static UsersDto ToDto(Users user)
        {
            if (user == null) return null;
            return ToDtoBase(user);
        }
    }
}

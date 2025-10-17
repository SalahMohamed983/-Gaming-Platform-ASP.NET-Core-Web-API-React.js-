using BusinessLayer.Mapper;
using DataAccessLayer.Entities;
using DataAccessLayer.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Services
{
    public class FavoritGamesService : IFavoritGames
    {

        private readonly IUnitOfWork _unitOfWork;
        public FavoritGamesService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        public async Task<BigGamesDto> Add(FavoritGamesDto favoritGames)
        {

            var favorit = FavoritGamesMapper.ToEntity(favoritGames);

            _unitOfWork.FavoritGames.Add(favorit);

            if (await _unitOfWork.Complete())
            {
                // بعد الحفظ، أصبح لدينا ID عنصر المفضلة (favorit.Id)
                // الآن نسترد اللعبة كاملة للحصول على الاسم والصور
                var newFavoritGame = await _unitOfWork.FavoritGames
                    .GetById(favorit.Id, new[] { "Games", "Games.Images" });

                // يجب التأكد من وجود دالة تحويل مناسبة في Mapper 
                // (افتراض: FavoritGamesMapper.ToBigGamesDto)
                return FavoritGamesMapper.ToBigDtoBase(newFavoritGame);
            }

            return null; // فشل الحفظ
        }

        // ... بقية الكود تبقى كما هي (GetAllFavoritGames و Delete)
public async Task<List<BigGamesDto>> GetAllFavoritGames(int userId)
        {
            var games = await _unitOfWork.FavoritGames
                .GetAll(p => p.UserId == userId, new[] { "Games", "Games.Images" });

            var dtos = FavoritGamesMapper.ToDtos(games);

            return dtos;
        }

        public async Task<bool> Delete(int Id)
        {
            _unitOfWork.FavoritGames.Delete(Id);

            return (await _unitOfWork.Complete());
        }
    }
}

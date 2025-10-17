using BusinessLayer.Mapper;
using DataAccessLayer.RepoInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Entities;

namespace BusinessLayer.Services
{
    public class UserService : IUsers
    {

        private readonly IUnitOfWork _unitOfWork;
        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;

        }
        public async Task<bool> Add(UserAddDto usersDto)
        {

            var user = UsersMapper.ToEntity(usersDto);

            _unitOfWork.Users.Add(user);

            return (await _unitOfWork.Complete());

        }

        public async Task<UsersDto> FindUserByPasswordAndEmail(string password, string email)
        {
            var user = await _unitOfWork.Users.Get(p => p.Password == password && p.Email == email);

            if (user != null)
            {
                var dto = UsersMapper.ToDto(user);
                return dto;
            }

            return null;

        }
    }
}

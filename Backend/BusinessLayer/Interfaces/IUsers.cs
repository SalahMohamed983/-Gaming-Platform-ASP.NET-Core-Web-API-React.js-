using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public interface IUsers
    {
        Task<UsersDto> FindUserByPasswordAndEmail(string password, string email);
        Task<bool> Add(UserAddDto usersDto);
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class UsersDto
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string AccessToken { get; set; }
    }
    public class UserAddDto
    {

        public string FullName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Email { get; set; } = null!;

        public UserAddDto()
        { }
        public UserAddDto(string FullName, string Password, string Email)
        {
            this.FullName = FullName;
            this.Password = Password;
            this.Email = Email;
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class FavoritGames
    {
        public int Id { get; set; }
        public int GameId { get; set; }
        public int UserId { get; set; }
        public Games Games { get; set; }
        public Users Users { get; set; }
    }
}

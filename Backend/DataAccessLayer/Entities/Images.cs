using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class Images
    {
        public int Id { get; set; }
        public string ImageUrl {  get; set; }
    public int GamesID { get; set; }
        public Games Games { get; set; }
    }
}

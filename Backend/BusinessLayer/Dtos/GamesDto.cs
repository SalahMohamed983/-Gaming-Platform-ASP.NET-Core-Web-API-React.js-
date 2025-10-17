using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class GamesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int CategoryID { get; set; }
        public int OperateCategoryID { get; set; }
        public ICollection<ImagesDto> Images { get; set; }
    }
    public class BigGamesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Rating { get; set; }
        public int CategoryID { get; set; }
        public int OperateCategoryID { get; set; }
        public ICollection<ImagesDto> Images { get; set; }

    }
}

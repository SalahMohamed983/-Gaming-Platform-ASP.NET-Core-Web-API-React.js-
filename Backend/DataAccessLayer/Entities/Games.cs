using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class Games
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Rating { get; set; }
        public int CategoryID { get; set; }
        public int OperateCategoryID { get; set; }
       public Category Category { get; set; }
       public OperateCategory OperateCategory { get; set; }
        public virtual ICollection<Images> Images { get; set; }
    }
}

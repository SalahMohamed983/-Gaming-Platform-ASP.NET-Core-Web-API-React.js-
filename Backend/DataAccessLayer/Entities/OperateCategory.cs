using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Entities
{
    public class OperateCategory
    {
        public int Id { get; set; }
        public string OperateCategoryName { get; set; }
       public virtual ICollection<Games> Games { get; set; }

    }
}

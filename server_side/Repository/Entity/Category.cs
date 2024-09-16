using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Picture {  get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<User> Users { get; set; }       

    }
}

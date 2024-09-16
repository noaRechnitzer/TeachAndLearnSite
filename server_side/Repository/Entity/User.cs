using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Repository.Entity
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public string Email { get; set; }
        public string Password { get; set; }
        public virtual ICollection<Purchase> Purchase_history { get; set; }
        public virtual ICollection<Category> CategoriesList { get; set; }
        public virtual ICollection<Response> Responses { get; set; } 
        public virtual ICollection<Views>  Views { get; set; }
    }
}

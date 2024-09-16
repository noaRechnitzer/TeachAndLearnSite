using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public enum Subscriptions
    {
        monthly = 1,
        semiannual=3,
        forever=6

    }
    public class Purchase
    {
        public int Id { get; set; }
        public Subscriptions SubscriptionsType { get; set; }
        public int Sum { get; set; }
        public DateTime StartDate { get; set;}
        public DateTime EndDate { get; set;}
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; } 
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
        public Course Course { get; set; }

    }
}

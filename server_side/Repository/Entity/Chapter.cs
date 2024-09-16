using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public class Chapter
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public string video { get; set; } 
        public int CourseId { get; set; }
        [ForeignKey("CourseId")]
       
        public Course Course { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entity
{
    public enum Language
    {
        hebrew ,
        english,
    }
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime DatePublished { get; set; }
        public int Price_first { get; set; }
        public int Price_now { get; set; }
        public Language Language { get; set; }
        public int Num_chapter { get; set; }
        public int Duration { get; set; }
        public string Picture { get; set; }
        public string Video { get; set; }
        public int LectureId { get; set; }
        [ForeignKey("LectureId")]
        public virtual Lecture Lecture { get; set; }
        public virtual ICollection<Category>  Categories { get; set; }
        public virtual ICollection<Chapter> Chapters { get; set; }       
        public virtual ICollection<Response> Responses { get; set; }
        public virtual ICollection<Purchase> Purchases { get; set; }
    }
}

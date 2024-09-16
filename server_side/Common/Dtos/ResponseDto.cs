using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos
{
    public class ResponseDto
    {
        public int? Id { get; set; }
        public string Description { get; set; }
        public int UserId { get; set; }       
        public int CourseId { get; set; }
    }
}

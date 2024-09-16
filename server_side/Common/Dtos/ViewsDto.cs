using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Dtos
{
    public class ViewsDto
    {
        public int? Id { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int NumView { get; set; }
    }
}

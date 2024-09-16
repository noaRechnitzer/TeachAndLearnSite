using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace Services.Interfaes
{
    public interface IServicesExtention<T>:IServices<T>
    {
        public Task<string> GetUserByUserEmail(string userName,string password);
    }
}

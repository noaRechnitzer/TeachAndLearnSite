using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interfaes
{
    public interface IEmailSender
    {
        void SendEmailAsync(string email,string subject, string messege,string htmlBody);
        void SendEmailForPayment(string email, string subject, string messege);

    }
}

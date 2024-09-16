using Services.Interfaes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;

namespace Services.Services
{
    public class EmailSenderService : IEmailSender
    {
        public void SendEmailAsync(string email, string subject, string messege, string htmlBody)
        {

            var mail = "teachlearnsite@gmail.com";
            var pw = "parbwoixkrxowckg";

            SmtpClient client = new SmtpClient("smtp.gmail.com");
            client.Port = 25; // Gmail SMTP port
            client.EnableSsl = true; // Enable SSL/TLS
            client.UseDefaultCredentials = false; // Disable default credentia
            client.Credentials = new NetworkCredential(mail, pw);
            MailMessage message = new MailMessage();
            message.From = new MailAddress(mail); // Sender's email address
            message.To.Add(email); // Recipient's email address
            message.Subject = subject;
            message.IsBodyHtml = true; // Set message body to HTML format
            message.Body = htmlBody;
            try
            {
                // Send the email
                client.Send(message);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }

        public void SendEmailForPayment(string email, string subject, string messege1)
        {
            var mail = "teachlearnsite@gmail.com";
            var pw = "parbwoixkrxowckg";

            SmtpClient client = new SmtpClient("smtp.gmail.com");
            client.Port = 25; // Gmail SMTP port
            client.EnableSsl = true; // Enable SSL/TLS
            client.UseDefaultCredentials = false; // Disable default credentia
            client.Credentials = new NetworkCredential(mail, pw);
            MailMessage message = new MailMessage();
            message.From = new MailAddress(mail); // Sender's email address
            message.To.Add(email); // Recipient's email address
            message.Subject = subject;
            message.Body = messege1;
            try
            {
                // Send the email
                client.Send(message);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
        }
    }
}

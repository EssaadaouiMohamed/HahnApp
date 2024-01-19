using HahnApp.Application.Requests.Mail;
using System.Threading.Tasks;

namespace HahnApp.Application.Interfaces.Services
{
    public interface IMailService
    {
        Task SendAsync(MailRequest request);
    }
}
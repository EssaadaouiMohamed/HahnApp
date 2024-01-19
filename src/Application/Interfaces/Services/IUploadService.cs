using HahnApp.Application.Requests;

namespace HahnApp.Application.Interfaces.Services
{
    public interface IUploadService
    {
        string UploadAsync(UploadRequest request);
    }
}
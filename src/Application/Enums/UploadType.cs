using System.ComponentModel;

namespace HahnApp.Application.Enums
{
    public enum UploadType : byte
    {
        [Description(@"Images\ProfilePictures")]
        ProfilePicture,

        [Description(@"Documents")]
        Document
    }
}
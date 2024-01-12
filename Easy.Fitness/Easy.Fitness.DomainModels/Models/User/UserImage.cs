using System.IO;

namespace Easy.Fitness.DomainModels.Models
{
    public class UserImage
    {
        public Stream Stream { get; private set; }
        public string FileName { get; private set; }
        public long Size { get; private set; }

        public UserImage(Stream stream, string fileName, long size)
        {
            Stream = stream;
            FileName = fileName;
            Size = size;
        }

        public UserImage(Stream stream, string fileName)
        {
            Stream = stream;
            FileName = fileName;
        }
    }
}

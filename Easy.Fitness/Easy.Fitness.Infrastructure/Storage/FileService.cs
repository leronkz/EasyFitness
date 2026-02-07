using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.Infrastructure.Configuration;
using Easy.Fitness.Infrastructure.Exceptions;
using Minio;
using Minio.DataModel.Args;
using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.Storage
{
    public class FileService : IFileService
    {
        private readonly AppConfiguration _config;
        private readonly IMinioClient _minio;
        public FileService(AppConfiguration config)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _minio = new MinioClient()
                .WithEndpoint(config.Storage.Minio.Endpoint)
                .WithCredentials(config.Storage.Minio.AccessKey, config.Storage.Minio.SecretKey)
                .Build();
        }

        public async Task SaveFileAsync(UserImage file, CancellationToken cancellationToken)
        {
            try
            {
                PutObjectArgs args = new PutObjectArgs()
                                       .WithBucket(_config.Storage.Minio.BucketName)
                                       .WithObject(file.FileName)
                                       .WithObjectSize(file.Size)
                                       .WithStreamData(file.Stream)
                                       .WithContentType("application/octet-stream");

                await _minio.PutObjectAsync(args, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new StorageException("There is a problem with saving your file", ex);
            }
        }

        public async Task<string> GetFileAsync(string fileName, CancellationToken cancellationToken)
        {
            try
            {
                using (MemoryStream resultStream = new MemoryStream())
                {
                    GetObjectArgs args = new GetObjectArgs()
                                             .WithBucket(_config.Storage.Minio.BucketName)
                                             .WithObject(fileName)
                                             .WithCallbackStream((stream) =>
                                             {
                                                 stream.CopyTo(resultStream);
                                             });
                    await _minio.GetObjectAsync(args, cancellationToken);
                    resultStream.Seek(0, SeekOrigin.Begin);
                    byte[] data = resultStream.ToArray();

                    return Convert.ToBase64String(data);
                }
            }
            catch (Exception ex)
            {
                throw new StorageException("An error occurred while trying to load your profile picture", ex);
            }
        }

        public async Task RemoveFileAsync(string fileName, CancellationToken cancellationToken)
        {
            try
            {
                RemoveObjectArgs args = new RemoveObjectArgs()
                                            .WithBucket(_config.Storage.Minio.BucketName)
                                            .WithObject(fileName);
                await _minio.RemoveObjectAsync(args, cancellationToken);
            }
            catch (Exception ex)
            {
                throw new StorageException("An error occurred while trying to delete your profile picture", ex);
            }
        }
    }
}

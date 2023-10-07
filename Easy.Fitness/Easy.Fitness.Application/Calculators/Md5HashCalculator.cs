using System;
using System.Security.Cryptography;
using System.Text;

namespace Easy.Fitness.Application.Calculators
{
    public class Md5HashCalculator : IHashCalculator
    {
        public string Hash(string input)
        {
            using MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.ASCII.GetBytes(input);
            byte[] hashBytes = md5.ComputeHash(inputBytes);

            return Convert.ToHexString(hashBytes);
        }
    }
}

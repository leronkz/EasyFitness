namespace Easy.Fitness.Application.Calculators
{
    public static class FileNameCalculator
    {
        public static string Calculate(string fileName)
        {
            IHashCalculator calculator = new Md5HashCalculator();

            return calculator.Hash(fileName);
        }
    }
}

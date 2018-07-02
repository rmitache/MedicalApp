using System;
using Xunit;

namespace BLL.UnitTests
{
    public class MedicineRuleItemFactoryTests
    {


        // MethodName_Input_ExpectedOutput
        
        [Fact]
        public void GetFullName_InvalidArguments_ThrowsArgumentException()
        {
            Assert.Throws<ArgumentException>(() => GetFullName("", ""));
            Assert.Throws<ArgumentException>(() => GetFullName("Mary", ""));
        }

        [Fact]
        public void GetFullName_ValidInputs_ReturnsCorrectResult_Example1()
        {
            string fullNameResult = GetFullName(" Mary ", " Jane   ");
            Assert.Equal("Mary Jane", fullNameResult);
        }

        [Theory]
        [InlineData(" Mary", "  Jane  ", "Mary Jane")]
        [InlineData(" Bob", "Marley", "Bob Marley")]
        [InlineData(" Joe Hanson", " Lee   ", "Joe Hanson Lee")]
        public void GetFullName_ValidInputs_ReturnsCorrectResult_Example2(string firstName, string lastName, string expectedFullName)
        {
            string fullNameResult = GetFullName(firstName, lastName);

            Assert.Equal(expectedFullName, fullNameResult);
        }




        public static string GetFullName(string firstName, string lastName)
        {
            if (string.IsNullOrWhiteSpace(firstName))
            {
                throw new ArgumentException("First name must be provided.");
            }
            if (string.IsNullOrWhiteSpace(lastName))
            {
                throw new ArgumentException("Last name must be provided.");
            }

            return $"{firstName.Trim()} {lastName.Trim()}".Trim();
        }
    }
}

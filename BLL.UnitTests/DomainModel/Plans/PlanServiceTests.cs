using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Factories;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using DataAccessLayer.Repositories;
using Moq;

namespace BLL.UnitTests.DomainModel.Plans
{
    public class PlanServiceTests
    {
        // MethodName_Input_ExpectedOutput


        [Fact]
        public void UpdatePlan_PlanBLOWithMoreThanOneVersionAndLatestVersionHasIDZero_UpdatePreviousLastVersionAndAddTheNewLatestVersion()
        {
            // Mock dependencies
            var planRepositoryMock = new Mock<IPlanRepository>();
            var planFactoryMock = new Mock<IPlanFactory>();
            var versionRepositoryMock = new Mock<IVersionRepository>();
            var versionFactoryMock = new Mock<IVersionFactory>();

        }

        
        //[Fact]
        //public void ConvertToDataEntity_NormalDataEntity_MatchingFields()
        //{
        //    // Mock MedicineTypeFactory 
        //    var medTypeFactoryMock = new Mock<IMedicineTypeFactory>();
        //    medTypeFactoryMock
        //        .Setup(factory => factory.Convert_ToBLO(
        //            It.IsAny<TMedicineType>()))
        //            .Returns(new Mock<MedicineType>().Object);

        //    // Create the MedicineRuleItemFactory
        //    var medicineRuleItemFactory = new MedicineRuleItemFactory(medTypeFactoryMock.Object);



        //    // Test methods 


        //    //// Mock the MedicineRuleItem BLO 
        //    //var MedicineRuleItemBLOMock = new Mock<IMedicineTypeFactory>();

        //    //var medRuleItemFactory
        //}



        //[Theory]
        //[InlineData(" Mary", "  Jane  ", "Mary Jane")]
        //[InlineData(" Bob", "Marley", "Bob Marley")]
        //[InlineData(" Joe Hanson", " Lee   ", "Joe Hanson Lee")]
        //public void GetFullName_ValidInputs_ReturnsCorrectResult_Example2(string firstName, string lastName, string expectedFullName)
        //{
        //    string fullNameResult = GetFullName(firstName, lastName);

        //    Assert.Equal(expectedFullName, fullNameResult);
        //}


        //public static string GetFullName(string firstName, string lastName)
        //{
        //    if (string.IsNullOrWhiteSpace(firstName))
        //    {
        //        throw new ArgumentException("First name must be provided.");
        //    }
        //    if (string.IsNullOrWhiteSpace(lastName))
        //    {
        //        throw new ArgumentException("Last name must be provided.");
        //    }

        //    return $"{firstName.Trim()} {lastName.Trim()}".Trim();
        //}
    }
}

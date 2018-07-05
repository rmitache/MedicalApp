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
using BLL.DomainModel.Plans.Services;

namespace BLL.UnitTests.DomainModel.Plans
{
    public class PlanServiceTests
    {
        // MethodName_Input_ExpectedOutput


        //[Fact]
        //public void UpdatePlan_PlanBLOWithMoreThanOneVersionAndLatestVersionHasIDZero_UpdatePreviousLastVersionAndAddTheNewLatestVersion()
        //{
        //    // Mock dependencies
        //    var versionFactoryMock = new Mock<IVersionFactory>();
        //    var versionRepositoryMock = new Mock<IVersionRepository>();
        //    var planRepositoryMock = new Mock<IPlanRepository>();
        //    var planFactoryMock = new Mock<IPlanFactory>();



        //    // Mock input PlanBLO (versions > 1 and latest version has ID == 0)
        //    var userId = 1;
        //    var planBLOMock = new Mock<Plan>();

        //    // Mock PlanBLO.Versions 
        //    var versionsListMock = new Mock<List<BLL.DomainModel.Plans.BLOs.Version>>();
        //    versionsListMock
        //        .Setup(list => list.Count)
        //        .Returns(It.IsInRange<int>(2, int.MaxValue, Range.Inclusive));
        //    planBLOMock
        //        .Setup(plan => plan.Versions)
        //        .Returns(versionsListMock.Object);


        //    // Mock plan.GetLatestVersion()
        //    var latestVersionMock = new Mock<BLL.DomainModel.Plans.BLOs.Version>();
        //    latestVersionMock
        //        .Setup(version => version.ID)
        //        .Returns(0);
        //    planBLOMock
        //        .Setup(plan => plan.GetLatestVersion())
        //        .Returns(latestVersionMock.Object);



        //    // Create the PlanService
        //    var planService = new PlanService(
        //        planRepositoryMock.Object,
        //        planFactoryMock.Object,
        //        versionRepositoryMock.Object,
        //        versionFactoryMock.Object
        //        );

        //    // 
        //    planService.UpdatePlan(planBLOMock.Object, userId);
        //    versionRepositoryMock.Verify(versionRepo => versionRepo.UpdateVersion(It.IsAny<TPlanVersion>(), It.IsAny<int>()), Times.Once);
           
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

    }
}

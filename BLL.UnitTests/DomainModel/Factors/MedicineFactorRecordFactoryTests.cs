using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans;

using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BLL.UnitTests.DomainModel.Factors
{
    public class MedicineFactorRecordFactoryTests
    {
        private Mock<Plan> CreatePlanBLOMock(DateTime utcVersionStartDateTime, DateTime? utcVersionEndDateTime)
        {

            // Mock Rule BLO
            var ruleMock = new Mock<Rule>();

            // Mock Version BLO
            var versionMock = new Mock<BLL.DomainModel.Plans.BLOs.Version>();
            versionMock.SetupGet(blo => blo.StartDateTime).Returns(utcVersionStartDateTime);
            versionMock.SetupGet(blo => blo.EndDateTime).Returns(utcVersionEndDateTime);
            versionMock.SetupGet(blo => blo.Rules).Returns(new List<Rule>() { ruleMock.Object });

            // Mock Plan BLO
            var planMock = new Mock<Plan>();
            planMock.SetupGet(blo => blo.Versions).Returns(new List<BLL.DomainModel.Plans.BLOs.Version>() { versionMock.Object });



            return planMock;
        }

        #region Create_FromSinglePlan Tests



        [Fact]
        public void Create_FromSinglePlan_PlanWithSingleVersionAndOneRule_ReturnsCorrect()
        {
            // Mock the RuleHitPatternService -> make it return a bunch of 

            // Verify 
            // - 

            //// Arrange
            //DateTime localVersionStartDateTime = this.ParseDateTimeStringAsLocal(localVersionStartDateStr);
            //DateTime localMinDateTime = this.ParseDateTimeStringAsLocal(localMinDateStr);
            //DateTime localMaxDateTime = this.ParseDateTimeStringAsLocal(localMaxDateStr);

            //// Mock the BLO
            //var planMock = this.CreatePlanBLOMock()


        }



        #endregion

    }
}

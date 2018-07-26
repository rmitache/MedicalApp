using BLL.DomainModel.Factors.Medicine.BLOs;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace BLL.UnitTests.DomainModel.Factors
{
    public class MedicineFactorRecordTests
    {
        // Private methods
        private Mock<MedicineFactorRecord> CreateMedicineFactorRecordBLOMock(int parentPlanID,
            int medicineTypeID, DateTime occurrenceDateTime)
        {


            // Mock the BLO
            var medicineTypeBLOMock = new Mock<MedicineType>();
            medicineTypeBLOMock.SetupGet(mock => mock.ID).Returns(medicineTypeID);
            var bloMock = new Mock<MedicineFactorRecord>();
            bloMock.SetupGet(blo => blo.ParentPlanID).Returns(parentPlanID);
            bloMock.Setup(blo => blo.MedicineType).Returns(medicineTypeBLOMock.Object);
            bloMock.SetupGet(blo => blo.OccurrenceDateTime).Returns(occurrenceDateTime);

            return bloMock;
        }

        #region DetermineCompositeID Tests


        // DetermineCompositeID - using BLO
        [Theory]
        [InlineData(-1, 23, "14/01/2015")]
        public void DetermineCompositeID_BLOWithParentPlanIDMinusOne_ThrowsException(int parentPlanID, 
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineTypeID, occurrenceDateTime);

            // Test 
            Assert.Throws<ArgumentException>(() => MedicineFactorRecord.DetermineCompositeID(bloMock.Object));
        }

        [Theory]
        [InlineData(5, -1, "14/01/2015")]
        public void DetermineCompositeID_BLOWithMedicineTypeIDMinusOne_ThrowsException(int parentPlanID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineTypeID, occurrenceDateTime);

            // Test 
            Assert.Throws<ArgumentException>(() => MedicineFactorRecord.DetermineCompositeID(bloMock.Object));
        }
        [Theory]
        [InlineData(5, 2, "14/01/2015")]
        public void DetermineCompositeID_BLOWithValidID_ReturnsValidString(int parentPlanID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineTypeID, occurrenceDateTime);

            // Test 
            string result = MedicineFactorRecord.DetermineCompositeID(bloMock.Object);
            string expected = parentPlanID + "_" + + medicineTypeID + "_" + occurrenceDateTime.ToString();
            Assert.Equal(expected, result);
        }


        


        // ExtractFromCompositeID
        [Theory]
        [InlineData("124_24_14-01-2015 00:00:00")]
        public void ExtractFromCompositeID_ValidString_CorrectBreakdown(string str)
        {

            var breakdown = MedicineFactorRecord.ExtractFromCompositeID(str);
            Assert.Equal(124, breakdown.ParentPlanID);
            Assert.Equal(24, breakdown.MedicineTypeID);
            Assert.Equal(new DateTime(2015, 1, 14), breakdown.OccurrenceDateTime);

        }

        #endregion

    }
}

using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Plans.BLOs;
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
        private Mock<MedicineFactorRecord> CreateMedicineFactorRecordBLOMock(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, DateTime occurrenceDateTime)
        {


            // Mock the BLO
            var medicineTypeBLOMock = new Mock<MedicineType>();
            medicineTypeBLOMock.SetupGet(mock => mock.ID).Returns(medicineTypeID);
            var bloMock = new Mock<MedicineFactorRecord>();
            bloMock.SetupGet(blo => blo.ParentPlanID).Returns(parentPlanID);
            bloMock.SetupGet(blo => blo.ID).Returns(medicineFactorRecordID);
            bloMock.Setup(blo => blo.MedicineType).Returns(medicineTypeBLOMock.Object);
            bloMock.SetupGet(blo => blo.OccurrenceDateTime).Returns(occurrenceDateTime);

            return bloMock;
        }

        #region DetermineCompositeID Tests


        // DetermineCompositeID - using BLO
        [Theory]
        [InlineData(null, 124, 122, "14/01/2015")]
        public void DetermineCompositeID_BLOWithNullParentID_CompositeIDWithSingleNull(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime);

            // Test 
            string result = MedicineFactorRecord.DetermineCompositeID(bloMock.Object);
            string expected = "NULL" + "_" + medicineFactorRecordID + "_" + medicineTypeID + "_" + occurrenceDateTime.ToString();
            Assert.Equal(expected, result);
        }
        [Theory]
        [InlineData(5, -1, 122, "14/01/2015")]
        public void DetermineCompositeID_BLOWithIDMinusOne_CompositeIDWithSingleNull(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime);

            // Test 
            string result = MedicineFactorRecord.DetermineCompositeID(bloMock.Object);
            string expected = parentPlanID + "_" + "NULL" + "_" + medicineTypeID + "_" + occurrenceDateTime.ToString();
            Assert.Equal(expected, result);
        }
        [Theory]
        [InlineData(null, -1, 22, "16/01/2010")]
        [InlineData(null, -1, 222, "27/01/2014")]
        public void DetermineCompositeID_BothParentPlanIDAndIDAreNullAndMinusOne_ThrowsException(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {

            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime);

            // Test 
            Assert.Throws<Exception>(() => MedicineFactorRecord.DetermineCompositeID(bloMock.Object));
        }
        [Theory]
        [InlineData(12, 124, 122, "14/01/2015")]
        public void DetermineCompositeID_BLOWithParentIDAndAlsoID_ThrowsException(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Mock the BLO
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);
            var bloMock = CreateMedicineFactorRecordBLOMock(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime);

            // Test 
            Assert.Throws<Exception>(() => MedicineFactorRecord.DetermineCompositeID(bloMock.Object));
        }


        // DetermineCompositeID - using parameters
        [Theory]
        [InlineData(null, 124, 122, "14/01/2015")]
        public void DetermineCompositeIDWithParams_BLOWithNullParentID_CompositeIDWithSingleNull(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {
            // Parse the date 
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);

            // Test 
            string result = MedicineFactorRecord.DetermineCompositeID(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime);
            string expected = "NULL" + "_" + medicineFactorRecordID + "_" + medicineTypeID + "_" + occurrenceDateTime.ToString();
            Assert.Equal(expected, result);
        }
        [Theory]
        [InlineData(12, 13, 22, "16/01/2010")]
        [InlineData(14, 5, 222, "27/01/2014")]
        public void DetermineCompositeIDWithParams_BLOWithParentIDAndAlsoID_ThrowsException(int? parentPlanID, int medicineFactorRecordID,
            int medicineTypeID, string occurrenceDateTimeStr)
        {

            // Parse the date
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);

            // Test 
            Assert.Throws<Exception>(() => MedicineFactorRecord.DetermineCompositeID(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime));
        }
        [Theory]
        [InlineData(null, -1, 22, "16/01/2010")]
        public void DetermineCompositeIDWithParams_BothParentPlanIDAndIDAreNullAndMinusOne_ThrowsException(int? parentPlanID, int medicineFactorRecordID,
           int medicineTypeID, string occurrenceDateTimeStr)
        {

            // Parse the date
            DateTime occurrenceDateTime = DateTime.Parse(occurrenceDateTimeStr);

            // Test 
            Assert.Throws<Exception>(() => MedicineFactorRecord.DetermineCompositeID(parentPlanID, medicineFactorRecordID, medicineTypeID, occurrenceDateTime));
        }


        // ExtractFromCompositeID
        [Theory]
        [InlineData("NULL_124_122_14-01-2015 00:00:00")]
        public void ExtractFromCompositeID_ValidString_CorrectBreakdown(string str)
        {

            var breakdown = MedicineFactorRecord.ExtractFromCompositeID(str);
            Assert.Null(breakdown.ParentPlanID);
            Assert.Equal(124, breakdown.MedicineFactorRecordID);
            Assert.Equal(122, breakdown.MedicineTypeID);
            Assert.Equal(new DateTime(2015, 1, 14), breakdown.OccurrenceDateTime);

        }

        #endregion

    }
}

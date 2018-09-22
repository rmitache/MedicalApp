using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans;
using Moq;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;
using DataAccessLayer.Entities;
using BLL.DomainModel.Factors.Medicine.Library.Services;
using FluentAssertions;
using BLL.DomainModel.General.Enums;
using Common.DataStructures;
using BLL.DomainModel.Factors.Medicine.Services.Implementation;

namespace BLL.UnitTests.DomainModel.Factors
{
    public class SupplyCalculationEngineTests
    {
        private TMedicineTypeSupplyEntry CreateSupplyEntryMock(int amount, DateTime dateTime)
        {
            var supplyEntryMock = new TMedicineTypeSupplyEntry();
            supplyEntryMock.SupplyQuantity = amount;
            supplyEntryMock.EntryDateTime = dateTime;

            return supplyEntryMock;
        }
        private TTakenMedicineFactorRecord CreateTakenFactorRecordMock(bool medTypeIsPackagedIntoUnits, DateTime occurrenceDateTime,
            int ruleItemQuantity = 1, int? userDefinedUnitDoseSize = null)
        {
            var mock = new TTakenMedicineFactorRecord();
            mock.OccurrenceDateTime = occurrenceDateTime;
            mock.ActualTakenDateTime = occurrenceDateTime;

            // Mock ruleItem
            var ruleItemMock = new TPlanMedicineRuleItem();
            if (!medTypeIsPackagedIntoUnits)
            {
                ruleItemMock.UserDefinedUnitDoseSize = userDefinedUnitDoseSize;
            }
            ruleItemMock.UnitDoseQuantifier = ruleItemQuantity;


            mock.PlanMedicineRuleItem = ruleItemMock;
            return mock;
        }
        private Mock<MedicineFactorRecord> CreateFactorRecordMock(DateTime occurrenceDateTime, int medicineTypeID,
            int unitDoseQuantifier = 1, int? userDefinedUnitDoseSize = null)
        {
            var mock = new Mock<MedicineFactorRecord>();
            mock.Setup(x => x.OccurrenceDateTime).Returns(occurrenceDateTime);
            mock.Setup(x => x.MedicineType.ID).Returns(medicineTypeID);
            mock.Setup(x => x.UnitDoseQuantifier).Returns(unitDoseQuantifier);
            if (userDefinedUnitDoseSize != null)
            {
                mock.Setup(x => x.HasUserDefinedUnitDose).Returns(true);
                mock.Setup(x => x.UserDefinedUnitDoseSize).Returns(userDefinedUnitDoseSize);
            }

            return mock;
        }


        #region DetermineRemainingSupplyAmount Tests

        [Fact]
        public void DetermineCurrentSupplyAmount_DataEntityWithNoSuppliesAndNoTakenRecords_ReturnsNull()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineCurrentSupplyAmount(It.IsAny<TMedicineType>()))
                .CallBase();

            // Arrange - setup dataEntity with empty lists for Supplies and Taken records
            var medicineTypeMock = new TMedicineType();
            medicineTypeMock.TMedicineTypeSupplyEntry = new List<TMedicineTypeSupplyEntry>();
            medicineTypeMock.TTakenMedicineFactorRecord = new List<TTakenMedicineFactorRecord>();

            // Act 
            var result = serviceMock.Object.DetermineCurrentSupplyAmount(medicineTypeMock);

            // Assert
            result.Should().BeNull();


        }

        [Fact]
        public void DetermineCurrentSupplyAmount_DataEntityWithNoSuppliesButWithTakenRecords_ReturnsNull()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineCurrentSupplyAmount(It.IsAny<TMedicineType>()))
                .CallBase();

            // Arrange - setup dataEntity 
            var medicineTypeMock = new TMedicineType();
            medicineTypeMock.TMedicineTypeSupplyEntry = new List<TMedicineTypeSupplyEntry>();
            medicineTypeMock.TTakenMedicineFactorRecord = new List<TTakenMedicineFactorRecord>()
            {
                this.CreateTakenFactorRecordMock(true, DateTime.UtcNow),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow )
            };

            // Act 
            var result = serviceMock.Object.DetermineCurrentSupplyAmount(medicineTypeMock);

            // Assert
            result.Should().BeNull();


        }

        [Fact]
        public void DetermineCurrentSupplyAmount_DataEntityWithSuppliesAndTakenRecordsAllBeforeFirstSupplyEntry_ReturnsSumOfAllSupplies()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineCurrentSupplyAmount(It.IsAny<TMedicineType>()))
                .CallBase();

            // Arrange - setup dataEntity 
            var medicineTypeMock = new TMedicineType();
            medicineTypeMock.IsPackagedIntoUnits = true;
            medicineTypeMock.TMedicineTypeSupplyEntry = new List<TMedicineTypeSupplyEntry>()
            {
                this.CreateSupplyEntryMock(50, DateTime.UtcNow.AddDays(3)),
                this.CreateSupplyEntryMock(20, DateTime.UtcNow.AddDays(4))

            };
            medicineTypeMock.TTakenMedicineFactorRecord = new List<TTakenMedicineFactorRecord>()
            {
                this.CreateTakenFactorRecordMock(true, DateTime.UtcNow),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow )
            };

            // Act 
            var result = serviceMock.Object.DetermineCurrentSupplyAmount(medicineTypeMock);

            // Assert
            result.Should().Be(70);


        }

        [Fact]
        public void DetermineCurrentSupplyAmount_DataEntityWithSuppliesAndTakenRecordsOnlySomeAfterFirstSupplyEntry_ReturnsCorrectNumber()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineCurrentSupplyAmount(It.IsAny<TMedicineType>()))
                .CallBase();

            // Arrange - setup dataEntity 
            var medicineTypeMock = new TMedicineType();
            medicineTypeMock.IsPackagedIntoUnits = true;
            medicineTypeMock.TMedicineTypeSupplyEntry = new List<TMedicineTypeSupplyEntry>()
            {
                this.CreateSupplyEntryMock(50, DateTime.UtcNow.Subtract(new TimeSpan(2,0,0,0))),
                this.CreateSupplyEntryMock(20, DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0))),
                this.CreateSupplyEntryMock(20, DateTime.UtcNow),

            };
            medicineTypeMock.TTakenMedicineFactorRecord = new List<TTakenMedicineFactorRecord>()
            {
                this.CreateTakenFactorRecordMock(true, DateTime.UtcNow.Subtract(new TimeSpan(5,0,0,0)), 5),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow.Subtract(new TimeSpan(5,0,0,0)), 5),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0)), 10),
                this.CreateTakenFactorRecordMock(true,DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0)), 15),
            };

            // Act 
            var result = serviceMock.Object.DetermineCurrentSupplyAmount(medicineTypeMock);

            // Assert
            result.Should().Be(90 - 25);


        }

        [Fact]
        public void DetermineCurrentSupplyAmount_DataEntityNotPackedIntoUnitsWithSuppliesAndMoreTakenRecordsThanSupply_ReturnsZero()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineCurrentSupplyAmount(It.IsAny<TMedicineType>()))
                .CallBase();

            // Arrange - setup dataEntity 
            var medicineTypeMock = new TMedicineType();
            medicineTypeMock.IsPackagedIntoUnits = false;
            // medicineTypeMock.BaseUnitOfMeasureId = (int)UnitOfMeasure.Milligrams; // OBS: just for info purposes, none of the code should actually depend on this
            medicineTypeMock.TMedicineTypeSupplyEntry = new List<TMedicineTypeSupplyEntry>()
            {
                this.CreateSupplyEntryMock(500, DateTime.UtcNow.Subtract(new TimeSpan(2,0,0,0))), // 500 mg
                this.CreateSupplyEntryMock(200, DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0))), // 500 mg
                this.CreateSupplyEntryMock(200, DateTime.UtcNow), // 200 mg

            };
            medicineTypeMock.TTakenMedicineFactorRecord = new List<TTakenMedicineFactorRecord>()
            {
                this.CreateTakenFactorRecordMock(false, DateTime.UtcNow.Subtract(new TimeSpan(5,0,0,0)), 5, 100), // 5 x 100mg
                this.CreateTakenFactorRecordMock(false,DateTime.UtcNow.Subtract(new TimeSpan(5,0,0,0)), 5, 100), // 5 x 100 mg
                this.CreateTakenFactorRecordMock(false,DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0)), 10, 100), // 10 x 100 mg
                this.CreateTakenFactorRecordMock(false,DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0)), 15, 100), // 15 x 100 mg
            };

            // Act 
            var result = serviceMock.Object.DetermineCurrentSupplyAmount(medicineTypeMock);

            // Assert
            result.Should().Be(0);


        }


        [Fact]
        public void DetermineCurrentSupplyAmount_DataEntityNotPackedIntoUnitsWithSuppliesAndSomeTakenRecordsAfterFirstSupplyEntry_ReturnsCorrectNumber()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineCurrentSupplyAmount(It.IsAny<TMedicineType>()))
                .CallBase();

            // Arrange - setup dataEntity 
            var medicineTypeMock = new TMedicineType();
            medicineTypeMock.IsPackagedIntoUnits = false;
            // medicineTypeMock.BaseUnitOfMeasureId = (int)UnitOfMeasure.Milligrams; // OBS: just for info purposes, none of the code should actually depend on this
            medicineTypeMock.TMedicineTypeSupplyEntry = new List<TMedicineTypeSupplyEntry>()
            {
                this.CreateSupplyEntryMock(500, DateTime.UtcNow.Subtract(new TimeSpan(2,0,0,0))), // 500 mg
                this.CreateSupplyEntryMock(200, DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0))), // 200 mg
                this.CreateSupplyEntryMock(200, DateTime.UtcNow), // 200 mg

            };
            medicineTypeMock.TTakenMedicineFactorRecord = new List<TTakenMedicineFactorRecord>()
            {
                this.CreateTakenFactorRecordMock(false, DateTime.UtcNow.Subtract(new TimeSpan(5,0,0,0)), 1, 100), // 1 x 100mg
                this.CreateTakenFactorRecordMock(false,DateTime.UtcNow.Subtract(new TimeSpan(5,0,0,0)), 1, 100), // 1 x 100 mg
                this.CreateTakenFactorRecordMock(false,DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0)), 1, 100), // 1 x 100 mg
                this.CreateTakenFactorRecordMock(false,DateTime.UtcNow.Subtract(new TimeSpan(1,0,0,0)), 1, 100), // 1 x 100 mg
            };

            // Act 
            var result = serviceMock.Object.DetermineCurrentSupplyAmount(medicineTypeMock);

            // Assert
            result.Should().Be(700);


        }
        #endregion

        #region DetermineSupplyWillLastUntil Tests

        [Fact]
        public void DetermineSupplyWillLastUntil_OnlyFactorRecordsMatchingMedTypeIDWithPackagedUnitDose_ReturnsCorrectDate()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineSupplyWillLastUntil(It.IsAny<int>(), It.IsAny<List<MedicineFactorRecord>>(),
                It.IsAny<int?>()))
                .CallBase();

            // Arrange - setup parameters
            var nowUtc = DateTime.UtcNow;
            int medicineTypeID = 5;
            int? currentSupply = 3;
            var factorRecordsListMock = new List<MedicineFactorRecord>();
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddMinutes(1), medicineTypeID).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(1), medicineTypeID, 1).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(2), medicineTypeID, 1).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(3), medicineTypeID, 1).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(4), medicineTypeID, 1).Object);

            // Act 
            var result = serviceMock.Object.DetermineSupplyWillLastUntil(medicineTypeID, factorRecordsListMock, currentSupply);

            // Assert
            result.Should().Be(nowUtc.AddDays(2));
        }
        [Fact]
        public void DetermineSupplyWillLastUntil_OnlySomeFactorRecordsMatchingMedTypeIDWithPackagedUnitDose_ReturnsCorrectDate()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineSupplyWillLastUntil(It.IsAny<int>(), It.IsAny<List<MedicineFactorRecord>>(),
                It.IsAny<int?>()))
                .CallBase();

            // Arrange - setup parameters
            var nowUtc = DateTime.UtcNow;
            int medicineTypeID = 5;
            int differentMedTypeID = 20;
            int? currentSupply = 10;
            var factorRecordsListMock = new List<MedicineFactorRecord>();
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddMinutes(1), medicineTypeID, 2).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(1), differentMedTypeID, 1).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(2), medicineTypeID, 3).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(3), differentMedTypeID, 1).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(4), medicineTypeID, 7).Object);

            // Act 
            var result = serviceMock.Object.DetermineSupplyWillLastUntil(medicineTypeID, factorRecordsListMock, currentSupply);

            // Assert
            result.Should().Be(nowUtc.AddDays(2));
        }
        [Fact]
        public void DetermineSupplyWillLastUntil_OnlyFactorRecordsMatchingMedTypeIDWithUserDefinedUnitDose_ReturnsCorrectDate()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineSupplyWillLastUntil(It.IsAny<int>(), It.IsAny<List<MedicineFactorRecord>>(),
                It.IsAny<int?>()))
                .CallBase();

            // Arrange - setup parameters
            var nowUtc = DateTime.UtcNow;
            int medicineTypeID = 5;
            int? currentSupply = 800;
            var factorRecordsListMock = new List<MedicineFactorRecord>();
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddMinutes(1), medicineTypeID, 1, 200).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(1), medicineTypeID, 1, 200).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(2), medicineTypeID, 2, 200).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(3), medicineTypeID, 1, 200).Object);
            factorRecordsListMock.Add(this.CreateFactorRecordMock(nowUtc.AddDays(4), medicineTypeID, 1, 200).Object);

            // Act 
            var result = serviceMock.Object.DetermineSupplyWillLastUntil(medicineTypeID, factorRecordsListMock, currentSupply);

            // Assert
            result.Should().Be(nowUtc.AddDays(2));
        }


        [Fact]
        public void DetermineSupplyWillLastUntil_EmptyFactorRecordsList_ReturnsNull()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineSupplyWillLastUntil(It.IsAny<int>(), It.IsAny<List<MedicineFactorRecord>>(),
                It.IsAny<int?>()))
                .CallBase();

            // Arrange - setup parameters
            var nowUtc = DateTime.UtcNow;
            int medicineTypeID = 5;
            int? currentSupply = 3;
            var factorRecordsListMock = new List<MedicineFactorRecord>();

            // Act 
            var result = serviceMock.Object.DetermineSupplyWillLastUntil(medicineTypeID, factorRecordsListMock, currentSupply);

            // Assert
            result.Should().BeNull();

        }
        [Fact]
        public void DetermineSupplyWillLastUntil_NullCurrentSupply_ThrowsException()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineSupplyWillLastUntil(It.IsAny<int>(), It.IsAny<List<MedicineFactorRecord>>(),
                It.IsAny<int?>()))
                .CallBase();

            // Arrange - setup parameters
            var nowUtc = DateTime.UtcNow;
            int medicineTypeID = 5;

            // Act and Assert
            Action callMethod = () => { serviceMock.Object.DetermineSupplyWillLastUntil(medicineTypeID, null, null); };
            callMethod.Should().Throw<ArgumentNullException>();

        }
        [Fact]
        public void DetermineSupplyWillLastUntil_NullFactorRecords_ThrowsException()
        {
            // Arrange - setup service
            var serviceMock = new Mock<SupplyCalculationEngine>();
            serviceMock.Setup(service => service.DetermineSupplyWillLastUntil(It.IsAny<int>(), It.IsAny<List<MedicineFactorRecord>>(),
                It.IsAny<int?>()))
                .CallBase();

            // Arrange - setup parameters
            var nowUtc = DateTime.UtcNow;
            int medicineTypeID = 5;

            // Act and Assert
            Action callMethod = () => { serviceMock.Object.DetermineSupplyWillLastUntil(medicineTypeID, null, 2); };
            callMethod.Should().Throw<ArgumentNullException>();

        }
        
        #endregion
    }
}

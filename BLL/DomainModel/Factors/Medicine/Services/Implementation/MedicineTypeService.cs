using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Services;
using Common;
using Common.DataStructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public class MedicineTypeService : IMedicineTypeService
    {
        // Fields
        private readonly IMedicineTypeRepository medicineTypeRepo;
        private readonly IMedicineTypeFactory medicineTypeFactory;
        private readonly IPlanService planService;

        // Private methods
        private Dictionary<string, MedicineType> GetUniqueMedicineTypesInUseByPlans(List<Plan> planBLOs, Range<DateTime> targetDateRange)
        {
            // Variables
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseAcrossPlans = new Dictionary<string, MedicineType>();

            // Get Versions in the plans which intersect with the targetDateRange
            foreach (Plan plan in planBLOs)
            {
                // For each Version loop through the unique MedicineTypes and merge them to the list 
                var versionsInPlanHittingToday = plan.GetVersionsWhichIntersectWithDateRange(targetDateRange);
                foreach (Plans.BLOs.Version version in versionsInPlanHittingToday)
                {
                    var uniqueMedTypesInVersion = version.GetUniqueMedicineTypes();
                    foreach (string medicineTypeName in uniqueMedTypesInVersion.Keys)
                    {
                        if (!uniqueMedicineTypesInUseAcrossPlans.ContainsKey(medicineTypeName))
                        {
                            uniqueMedicineTypesInUseAcrossPlans[medicineTypeName] = uniqueMedTypesInVersion[medicineTypeName];
                        }
                    }
                }
            }

            // 
            return uniqueMedicineTypesInUseAcrossPlans;
        }
        private int GetRemainingSupplyInDays(TMedicineType medicineTypeDataEntity, List<TTakenMedicineFactorRecord> takenEntities)
        {
            return 0;
        }

        // Constructor
        public MedicineTypeService(IMedicineTypeRepository medicineTypeRepo,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService)
        {
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineTypeFactory = medicineTypeFactory;
            this.planService = planService;
        }

        // Public methods
        public MedicineType AddMedicineType(MedicineType blo, int userID)
        {
            var dataEntity = this.medicineTypeFactory.Convert_ToDataEntity(blo, userID);
            this.medicineTypeRepo.AddMedicineType(dataEntity);

            blo.ID = dataEntity.Id;

            return blo;
        }
        public List<MedicineType> GetAllMedicineTypes(int userID, bool retreiveSupplyAndUsageInfo = false)
        {
            // Get usage info for MedicineTypes
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseToday = null;
            if (retreiveSupplyAndUsageInfo)
            {
                var planBLOs = this.planService.GetPlans(userID, true);
                Range<DateTime> today = new Range<DateTime>(DateTime.Now.StartOfDay(), DateTime.Now.EndOfDay());
                uniqueMedicineTypesInUseToday = this.GetUniqueMedicineTypesInUseByPlans(planBLOs, today);
            }

            // Get supply info (Goal ? -> Answer: For each MedicineType which is InUse, calculate how many days supply is remaining for
            if (retreiveSupplyAndUsageInfo)
            {
                // For each MedicineType

                    // Get the number of Taken FactorRecords pointing to the given  

                    // Loop through supply entries 
            }


            // Get all the medicineTypes available for the current user 
            var dataEntities = this.medicineTypeRepo.GetAllMedicineTypes(userID);
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities, uniqueMedicineTypesInUseToday);
            var sortedBLOs = blos.OrderBy(medicineType => medicineType.Name).ToList();


            return sortedBLOs;
        }
    }
}

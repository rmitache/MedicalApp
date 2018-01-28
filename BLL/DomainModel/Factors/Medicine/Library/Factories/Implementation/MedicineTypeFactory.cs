using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;

namespace BLL.DomainModel.Factors.Medicine.Library.Factories
{
    public class MedicineTypeFactory: IMedicineTypeFactory
    {
        // Constructor
        public MedicineTypeFactory()
        {

        }

        // Public methods
        public MedicineType Convert_ToBLO(TMedicineType dataEntity)
        {
            MedicineType blo = new MedicineType();
            blo.Name = dataEntity.Name;
            blo.ShortName = dataEntity.ShortName;
            blo.ProducerName = dataEntity.ProducerName;
            blo.Form = (Enums.MedicineForm)dataEntity.FormId;
            blo.PieceSize = dataEntity.PieceSize;
            blo.PieceSizeUnitOfMeasure = (UnitOfMeasure)dataEntity.PieceSizeUnitOfMeasureId;
            blo.ParentCategories = null;

            return blo;
        }
        public List<MedicineType> Convert_ToBLOList(List<TMedicineType> dataEntities)
        {
            var bloList = dataEntities.Select(dataEntity => Convert_ToBLO(dataEntity)).ToList();
            return bloList;
        }
    }
}

using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.General.Enums;

namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineType
    {
        // Properties
        public string Name { get; set; }
        public string ShortName { get; set; }
        public string ProducerName { get; set; }
        public MedicineForm Form { get; set; }
        public int? PieceSize { get; set; }
        public UnitOfMeasure PieceSizeUnitOfMeasure { get; set; }
        public MedicineCategory[] ParentCategories { get; set; }

        // Constructor
        internal MedicineType() { }
    }


}

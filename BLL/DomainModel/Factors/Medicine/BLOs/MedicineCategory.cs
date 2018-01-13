namespace BLL.DomainModel.Factors.Medicine.BLOs
{
    public  class MedicineCategory
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public MedicineCategory[] ChildCategories { get; set; }


        // Constructor
        internal MedicineCategory() { }
    }


}

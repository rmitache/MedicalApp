namespace BLL.DomainModel.Indicators.Symptoms.BLOs
{
    public  class SymptomCategory
    {
        // Properties
        public string Name { get; set; }
        public string Description { get; set; }
        public SymptomCategory[] ChildCategories { get; set; }


        // Constructor
        internal SymptomCategory() { }
    }


}

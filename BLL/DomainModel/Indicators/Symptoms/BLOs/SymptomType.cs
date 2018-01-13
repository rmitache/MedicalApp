namespace BLL.DomainModel.Indicators.Symptoms.BLOs
{
    public class SymptomType
    {
        // Properties
        public string Name { get; set; }
        public string Description { get; set; }
        public SymptomCategory[] ParentCategories { get; set; }

        // Constructor
        internal SymptomType() { }
    }

}

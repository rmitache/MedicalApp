1. COMMAND to update entities from DATABASE

dotnet ef dbcontext scaffold "Server=LENOVO-PC\RADUSQLINSTANCE;Database=DEV_MedicalApp;Trusted_Connection=True;"
Microsoft.EntityFrameworkCore.SqlServer --output-dir Entities -v

2. For above -> look into adding --context DataEntitiesContext (The name of the DBContext)

3. Wait for version 2.1 of EF Core to be able to preserve database table/column names
https://stackoverflow.com/questions/46934893/how-to-prevent-entity-framework-core-2-0-from-renaming-tables-and-columns-in-gen

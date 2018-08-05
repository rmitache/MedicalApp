I. COMMAND to update entities from DATABASE

dotnet ef dbcontext scaffold "Server=LENOVO-PC\RADUSQLINSTANCE;Database=DEV_MedicalApp;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer --context DataEntitiesContext --output-dir Entities -v -f


II. FUTURE (optional) - Wait for version 2.1 of EF Core to be able to preserve database table/column names
https://stackoverflow.com/questions/46934893/how-to-prevent-entity-framework-core-2-0-from-renaming-tables-and-columns-in-gen


III. Connection string to Azure
optionsBuilder.UseSqlServer(@"Server=tcp:medicalappdb.database.windows.net,1433;Initial Catalog=MedicalApp;Persist Security Info=False;User ID=rmitache@hotmail.com@medicalappdb.database.windows.net;Password=JohnDoe1453;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

IV. Local sql instance: 
	username: user
	password: stillalive


V. SQL code to clear all data in all tables in a target DB
EXEC sp_MSForEachTable 'ALTER TABLE ? NOCHECK CONSTRAINT ALL' 
GO 

EXEC sp_MSForEachTable 'DELETE FROM ?' 
GO 

-- enable referential integrity again 
EXEC sp_MSForEachTable 'ALTER TABLE ? WITH CHECK CHECK CONSTRAINT ALL' 
GO
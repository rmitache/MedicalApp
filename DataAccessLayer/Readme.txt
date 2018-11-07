I. COMMAND to update entities from DATABASE

dotnet ef dbcontext scaffold "Server=MSI\SQLExpress;Database=MedicalApp;Trusted_Connection=True;" Microsoft.EntityFrameworkCore.SqlServer --context DataEntitiesContext --output-dir Entities -v -f

OBS -> when u run the above, the DataEntitiesContext.cs file gets overriden and you need to manually apply point VI again !!!!!

II. FUTURE (optional) - Wait for version 2.1 of EF Core to be able to preserve database table/column names
https://stackoverflow.com/questions/46934893/how-to-prevent-entity-framework-core-2-0-from-renaming-tables-and-columns-in-gen


III. Connection strings
optionsBuilder.UseSqlServer(@"Server=LENOVO-PC\RADUSQLINSTANCE;Database=DEV_MedicalApp;Trusted_Connection=True;");
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


VI. Code which should be inside  protected override void OnConfiguring(DbContextOptionsBuilder options):
	- Code is used for setting timezoneKind on all datetimes taken from the DB to UTC 

	// Replace default materializer source to custom, to convert DateTimes
    optionsBuilder.ReplaceService<IEntityMaterializerSource, DateTimeKindEntityMaterializerSource>();
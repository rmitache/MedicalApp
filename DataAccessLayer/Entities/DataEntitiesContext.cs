using System;
using DataAccessLayer.Code;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace DataAccessLayer.Entities
{
    public partial class DataEntitiesContext : DbContext
    {
        public virtual DbSet<THealthStatusEntry> THealthStatusEntry { get; set; }
        public virtual DbSet<TMedicineType> TMedicineType { get; set; }
        public virtual DbSet<TMedicineTypeSupplyEntry> TMedicineTypeSupplyEntry { get; set; }
        public virtual DbSet<TPlan> TPlan { get; set; }
        public virtual DbSet<TPlanMedicineRuleItem> TPlanMedicineRuleItem { get; set; }
        public virtual DbSet<TPlanRule> TPlanRule { get; set; }
        public virtual DbSet<TPlanVersion> TPlanVersion { get; set; }
        public virtual DbSet<TSymptomEntry> TSymptomEntry { get; set; }
        public virtual DbSet<TSymptomType> TSymptomType { get; set; }
        public virtual DbSet<TTakenMedicineFactorRecord> TTakenMedicineFactorRecord { get; set; }
        public virtual DbSet<TUser> TUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=MSI\SQLEXPRESS;Database=MedicalApp;Trusted_Connection=True;");
                //optionsBuilder.UseSqlServer(@"Server=tcp:medicalappdb.database.windows.net,1433;Initial Catalog=MedicalApp;Persist Security Info=False;User ID=rmitache@hotmail.com@medicalappdb.database.windows.net;Password=JohnDoe1453;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

            }

            // Replace default materializer source to custom, to convert DateTimes
            optionsBuilder.ReplaceService<IEntityMaterializerSource, DateTimeKindEntityMaterializerSource>();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<THealthStatusEntry>(entity =>
            {
                entity.ToTable("t_health_status_entry");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.HealthLevelId).HasColumnName("health_level_id");

                entity.Property(e => e.OccurrenceDateTime)
                    .HasColumnName("occurrence_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.THealthStatusEntry)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_general_health_entry_t_user");
            });

            modelBuilder.Entity<TMedicineType>(entity =>
            {
                entity.ToTable("t_medicine_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BaseUnitOfMeasureId).HasColumnName("base_unit_of_measure_id");

                entity.Property(e => e.IsPackagedIntoUnits).HasColumnName("is_packaged_into_units");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.PackagedUnitDoseSize).HasColumnName("packaged_unit_dose_size");

                entity.Property(e => e.PackagedUnitDoseTypeId).HasColumnName("packaged_unit_dose_type_id");

                entity.Property(e => e.ProducerName)
                    .HasColumnName("producer_name")
                    .HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TMedicineType)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_medicine_type_t_user");
            });

            modelBuilder.Entity<TMedicineTypeSupplyEntry>(entity =>
            {
                entity.ToTable("t_medicine_type_supply_entry");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EntryDateTime)
                    .HasColumnName("entry_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.MedicineTypeId).HasColumnName("medicine_type_id");

                entity.Property(e => e.SupplyQuantity).HasColumnName("supply_quantity");

                entity.HasOne(d => d.MedicineType)
                    .WithMany(p => p.TMedicineTypeSupplyEntry)
                    .HasForeignKey(d => d.MedicineTypeId)
                    .HasConstraintName("FK_t_medicine_type_supply_entry_t_medicine_type");
            });

            modelBuilder.Entity<TPlan>(entity =>
            {
                entity.ToTable("t_plan");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DateCreated)
                    .HasColumnName("date_created")
                    .HasColumnType("date");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TPlan)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_plan_t_user");
            });

            modelBuilder.Entity<TPlanMedicineRuleItem>(entity =>
            {
                entity.ToTable("t_plan_medicine_rule_item");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.HasUserDefinedUnitDose).HasColumnName("has_user_defined_unit_dose");

                entity.Property(e => e.MedicineTypeId).HasColumnName("medicine_type_id");

                entity.Property(e => e.PlanRuleId).HasColumnName("plan_rule_id");

                entity.Property(e => e.UnitDoseQuantifier).HasColumnName("unit_dose_quantifier");

                entity.Property(e => e.UserDefinedUnitDoseSize).HasColumnName("user_defined_unit_dose_size");

                entity.Property(e => e.UserDefinedUnitDoseTypeId).HasColumnName("user_defined_unit_dose_type_id");

                entity.HasOne(d => d.MedicineType)
                    .WithMany(p => p.TPlanMedicineRuleItem)
                    .HasForeignKey(d => d.MedicineTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_plan_medicine_rule_item_t_medicine_type");

                entity.HasOne(d => d.PlanRule)
                    .WithMany(p => p.TPlanMedicineRuleItem)
                    .HasForeignKey(d => d.PlanRuleId)
                    .HasConstraintName("FK_t_plan_medicine_rule_item_t_plan_rule");
            });

            modelBuilder.Entity<TPlanRule>(entity =>
            {
                entity.ToTable("t_plan_rule");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.DaysInWeek)
                    .HasColumnName("days_in_week")
                    .HasMaxLength(50);

                entity.Property(e => e.FrequencyTypeId).HasColumnName("frequency_type_id");

                entity.Property(e => e.MomentsInDay)
                    .HasColumnName("moments_in_day")
                    .HasMaxLength(150);

                entity.Property(e => e.OrdinalFrequencyTypeId).HasColumnName("ordinal_frequency_type_id");

                entity.Property(e => e.PlanVersionId).HasColumnName("plan_version_id");

                entity.HasOne(d => d.PlanVersion)
                    .WithMany(p => p.TPlanRule)
                    .HasForeignKey(d => d.PlanVersionId)
                    .HasConstraintName("FK_t_plan_rule_t_plan_version");
            });

            modelBuilder.Entity<TPlanVersion>(entity =>
            {
                entity.ToTable("t_plan_version");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.EndDateTime)
                    .HasColumnName("end_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.PlanId).HasColumnName("plan_id");

                entity.Property(e => e.StartDateTime)
                    .HasColumnName("start_date_time")
                    .HasColumnType("datetime");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.TPlanVersion)
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("FK_t_plan_version_t_plan");
            });

            modelBuilder.Entity<TSymptomEntry>(entity =>
            {
                entity.ToTable("t_symptom_entry");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.HealthStatusEntryId).HasColumnName("health_status_entry_id");

                entity.Property(e => e.IntensityLevelId).HasColumnName("intensity_level_id");

                entity.Property(e => e.SymptomTypeId).HasColumnName("symptom_type_id");

                entity.HasOne(d => d.HealthStatusEntry)
                    .WithMany(p => p.TSymptomEntry)
                    .HasForeignKey(d => d.HealthStatusEntryId)
                    .HasConstraintName("FK_t_symptom_entry_t_health_status_entry");

                entity.HasOne(d => d.SymptomType)
                    .WithMany(p => p.TSymptomEntry)
                    .HasForeignKey(d => d.SymptomTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_symptom_entry_t_symptom_type");
            });

            modelBuilder.Entity<TSymptomType>(entity =>
            {
                entity.ToTable("t_symptom_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(150);

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TSymptomType)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_t_symptom_type_t_user");
            });

            modelBuilder.Entity<TTakenMedicineFactorRecord>(entity =>
            {
                entity.ToTable("t_taken_medicine_factor_record");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.ActualTakenDateTime)
                    .HasColumnName("actual_taken_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.MedicineTypeId).HasColumnName("medicine_type_id");

                entity.Property(e => e.OccurrenceDateTime)
                    .HasColumnName("occurrence_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.PlanId).HasColumnName("plan_id");

                entity.Property(e => e.PlanMedicineRuleItemId).HasColumnName("plan_medicine_rule_item_id");

                entity.HasOne(d => d.MedicineType)
                    .WithMany(p => p.TTakenMedicineFactorRecord)
                    .HasForeignKey(d => d.MedicineTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_taken_medicine_factor_record_t_medicine_type");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.TTakenMedicineFactorRecord)
                    .HasForeignKey(d => d.PlanId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_taken_medicine_factor_record_t_plan");

                entity.HasOne(d => d.PlanMedicineRuleItem)
                    .WithMany(p => p.TTakenMedicineFactorRecord)
                    .HasForeignKey(d => d.PlanMedicineRuleItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_taken_medicine_factor_record_t_plan_medicine_rule_item");
            });

            modelBuilder.Entity<TUser>(entity =>
            {
                entity.ToTable("t_user");

                entity.HasIndex(e => e.Email)
                    .HasName("IX_t_user")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.LastLoginDate)
                    .HasColumnName("last_login_date")
                    .HasColumnType("datetime");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50);

                entity.Property(e => e.TermsAcceptedDate)
                    .HasColumnName("terms_accepted_date")
                    .HasColumnType("datetime");
            });
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLayer.Entities
{
    public partial class DataEntitiesContext : DbContext
    {
        public virtual DbSet<THealthStatusEntry> THealthStatusEntry { get; set; }
        public virtual DbSet<TjMedicineTypeToMedicineCategory> TjMedicineTypeToMedicineCategory { get; set; }
        public virtual DbSet<TMedicineCategory> TMedicineCategory { get; set; }
        public virtual DbSet<TMedicineFactorRecord> TMedicineFactorRecord { get; set; }
        public virtual DbSet<TMedicineType> TMedicineType { get; set; }
        public virtual DbSet<TPlan> TPlan { get; set; }
        public virtual DbSet<TPlanMedicineRuleItem> TPlanMedicineRuleItem { get; set; }
        public virtual DbSet<TPlanRule> TPlanRule { get; set; }
        public virtual DbSet<TPlanVersion> TPlanVersion { get; set; }
        public virtual DbSet<TSymptomEntry> TSymptomEntry { get; set; }
        public virtual DbSet<TSymptomType> TSymptomType { get; set; }
        public virtual DbSet<TUser> TUser { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(@"Server=LENOVO-PC\RADUSQLINSTANCE;Database=DEV_MedicalApp;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<THealthStatusEntry>(entity =>
            {
                entity.ToTable("t_health_status_entry");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.HealthLevelId).HasColumnName("health_level_id");

                entity.Property(e => e.OccurrenceDateTime)
                    .HasColumnName("occurrence_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.THealthStatusEntry)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_t_general_health_entry_t_user");
            });

            modelBuilder.Entity<TjMedicineTypeToMedicineCategory>(entity =>
            {
                entity.ToTable("tj_medicine_type_to_medicine_category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.MedicineCategoryId).HasColumnName("medicine_category_id");

                entity.Property(e => e.MedicineTypeId).HasColumnName("medicine_type_id");

                entity.HasOne(d => d.MedicineCategory)
                    .WithMany(p => p.TjMedicineTypeToMedicineCategory)
                    .HasForeignKey(d => d.MedicineCategoryId)
                    .HasConstraintName("FK_tj_medicine_type_to_medicine_category_t_medicine_category");

                entity.HasOne(d => d.MedicineType)
                    .WithMany(p => p.TjMedicineTypeToMedicineCategory)
                    .HasForeignKey(d => d.MedicineTypeId)
                    .HasConstraintName("FK_tj_medicine_type_to_medicine_category_t_medicine_type");
            });

            modelBuilder.Entity<TMedicineCategory>(entity =>
            {
                entity.ToTable("t_medicine_category");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(500);

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TMedicineFactorRecord>(entity =>
            {
                entity.ToTable("t_medicine_factor_record");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AdministrationMethodId).HasColumnName("administration_method_id");

                entity.Property(e => e.InstructionId).HasColumnName("instruction_id");

                entity.Property(e => e.MedicineTypeId).HasColumnName("medicine_type_id");

                entity.Property(e => e.OccurrenceDateTime)
                    .HasColumnName("occurrence_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.UnitDoseQuantifier).HasColumnName("unit_dose_quantifier");

                entity.Property(e => e.UnitDoseSize).HasColumnName("unit_dose_size");

                entity.Property(e => e.UnitDoseTypeId).HasColumnName("unit_dose_type_id");

                entity.Property(e => e.UnitDoseUomId).HasColumnName("unit_dose_uom_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.MedicineType)
                    .WithMany(p => p.TMedicineFactorRecord)
                    .HasForeignKey(d => d.MedicineTypeId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_t_medicine_factor_record_t_medicine_type");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.TMedicineFactorRecord)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_t_medicine_factor_record_t_user");
            });

            modelBuilder.Entity<TMedicineType>(entity =>
            {
                entity.ToTable("t_medicine_type");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BaseFormId).HasColumnName("base_form_id");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.PackagedUnitDoseSize).HasColumnName("packaged_unit_dose_size");

                entity.Property(e => e.PackagedUnitDoseTypeId).HasColumnName("packaged_unit_dose_type_id");

                entity.Property(e => e.PackagedUnitDoseUomId).HasColumnName("packaged_unit_dose_uom_id");

                entity.Property(e => e.ProducerName)
                    .HasColumnName("producer_name")
                    .HasMaxLength(50);

                entity.Property(e => e.ShortName)
                    .HasColumnName("short_name")
                    .HasMaxLength(50);
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
                    .HasConstraintName("FK_t_plan_t_user");
            });

            modelBuilder.Entity<TPlanMedicineRuleItem>(entity =>
            {
                entity.ToTable("t_plan_medicine_rule_item");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.AdministrationMethodId).HasColumnName("administration_method_id");

                entity.Property(e => e.InstructionId).HasColumnName("instruction_id");

                entity.Property(e => e.MedicineTypeId).HasColumnName("medicine_type_id");

                entity.Property(e => e.PlanRuleId).HasColumnName("plan_rule_id");

                entity.Property(e => e.UnitDoseQuantifier).HasColumnName("unit_dose_quantifier");

                entity.Property(e => e.UnitDoseSize).HasColumnName("unit_dose_size");

                entity.Property(e => e.UnitDoseTypeId).HasColumnName("unit_dose_type_id");

                entity.Property(e => e.UnitDoseUomId).HasColumnName("unit_dose_uom_id");

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

                entity.Property(e => e.EndDate)
                    .HasColumnName("end_date")
                    .HasColumnType("date");

                entity.Property(e => e.PlanId).HasColumnName("plan_id");

                entity.Property(e => e.StartDate)
                    .HasColumnName("start_date")
                    .HasColumnType("date");

                entity.HasOne(d => d.Plan)
                    .WithMany(p => p.TPlanVersion)
                    .HasForeignKey(d => d.PlanId)
                    .HasConstraintName("FK_t_plan_version_t_plan");
            });

            modelBuilder.Entity<TSymptomEntry>(entity =>
            {
                entity.ToTable("t_symptom_entry");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.HealthStatusEntryId).HasColumnName("health_status_entry_id");

                entity.Property(e => e.IntensityLevelId).HasColumnName("intensity_level_id");

                entity.Property(e => e.OccurrenceDateTime)
                    .HasColumnName("occurrence_date_time")
                    .HasColumnType("datetime");

                entity.Property(e => e.SymptomTypeId).HasColumnName("symptom_type_id");

                entity.HasOne(d => d.HealthStatusEntry)
                    .WithMany(p => p.TSymptomEntry)
                    .HasForeignKey(d => d.HealthStatusEntryId)
                    .HasConstraintName("FK_t_symptom_entry_t_health_status_entry");

                entity.HasOne(d => d.SymptomType)
                    .WithMany(p => p.TSymptomEntry)
                    .HasForeignKey(d => d.SymptomTypeId)
                    .HasConstraintName("FK_t_symptom_entry_t_symptom_type");
            });

            modelBuilder.Entity<TSymptomType>(entity =>
            {
                entity.ToTable("t_symptom_type");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(250);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TUser>(entity =>
            {
                entity.ToTable("t_user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BirthDate)
                    .HasColumnName("birth_date")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Language)
                    .HasColumnName("language")
                    .HasMaxLength(50);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(50);

                entity.Property(e => e.SignupDate)
                    .HasColumnName("signup_date")
                    .HasColumnType("date");
            });
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLayer.Entities
{
    public partial class DataEntitiesContext : DbContext
    {
        public virtual DbSet<TjMedicineTypeToMedicineCategory> TjMedicineTypeToMedicineCategory { get; set; }
        public virtual DbSet<TMedicineCategory> TMedicineCategory { get; set; }
        public virtual DbSet<TMedicineType> TMedicineType { get; set; }
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

using webApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarrocinhaDoBem.Api.Context.Mappings;

public class AnimalMap : IEntityTypeConfiguration<Animal>
{
    public void Configure(EntityTypeBuilder<Animal> builder)
    {
      builder.ToTable("Animal");

      builder.HasKey(a => a.Id)
        .HasName("AnimalID");

      builder.Property(a => a.InstitutionId)
        .HasColumnName("InstitutionID")
        .IsRequired();

      builder.Property(a => a.Name)
        .HasColumnName("AnimalName")
        .HasColumnType("VARCHAR(100)")
        .IsRequired();

      builder.Property(a => a.Sex)
        .HasColumnName("Sex")
        .HasColumnType("INT")
        .IsRequired();

      builder.Property(a => a.PetSize)
        .HasColumnName("PetSize")
        .HasColumnType("INT")
        .IsRequired();

      builder.Property(a => a.BirthDate)
        .HasColumnName("BirthDate")
        .HasColumnType("DATE")
        .IsRequired();

      builder.Property(a => a.RescueDate)
        .HasColumnName("RescueDate")
        .HasColumnType("DATE")
        .IsRequired();

      builder.Property(a => a.Breed)
        .HasColumnName("Breed")
        .HasColumnType("VARCHAR(50)")
        .IsRequired();

      builder.Property(a => a.Species)
        .HasColumnName("Species")
        .HasColumnType("INT")
        .IsRequired();

      builder.Property(a => a.Description)
        .HasColumnName("Description")
        .HasColumnType("VARCHAR(100)");

      builder.Property(a => a.AnimalPic)
        .HasColumnName("AnimalPic")
        .HasColumnType("LONGBLOB");

      // Define o relacionamento com a tabela Institution
      builder.HasOne(a => a.Institution)
        .WithMany()
        .HasForeignKey(a => a.InstitutionId)
        .OnDelete(DeleteBehavior.Cascade);
    }
}

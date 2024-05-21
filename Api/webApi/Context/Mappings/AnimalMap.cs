using webApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarrocinhaDoBem.Api.Context.Mappings;

public class AnimalMap : IEntityTypeConfiguration<Animal>
{
    public void Configure(EntityTypeBuilder<Animal> builder)
    {
        builder.ToTable("Animal");

        builder.HasKey(x => x.Id)
            .HasName("AnimalID");

        builder.Property(a => a.InstitutionId)
            .HasColumnName("InstitutionID")
            .IsRequired();

        builder.Property(a =>a.PetSize)
            .HasColumnName("PetSize")
            .HasColumnType("FLOAT")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(a =>a.AnimalAge)
            .HasColumnName("PetSize")
            .HasColumnType("FLOAT")
            .HasMaxLength(100)
            .IsRequired();

        builder.Property(a =>a.AnimalAge)
            .HasColumnName("AnimalAge")
            .HasColumnType("DATE")
            .IsRequired();

        builder.Property(a =>a.RescueDate)
            .HasColumnName("RescueDate")
            .HasColumnType("DATE")
            .IsRequired();

        builder.Property(a =>a.AnimalName)
            .HasColumnName("AnimalName")
            .HasColumnType("VARCHAR(200)")
            .IsRequired();

        builder.Property(a =>a.Breed)
            .HasColumnName("Breed")
            .HasColumnType("VARCHAR(200)")
            .IsRequired();

        builder.Property(a =>a.Color)
            .HasColumnName("Color")
            .HasColumnType("VARCHAR(200)")
            .IsRequired();

        builder.Property(a =>a.AnimalType)
            .HasColumnName("AnimalType")
            .HasColumnType("VARCHAR(200)")
            .IsRequired();

        builder.Property(a => a.AnimalPic)
            .HasColumnType("blob")
            .HasColumnName("AnimalPic");

        // Define o relacionamento com a tabela Institution
        builder.HasOne(a => a.Institution)
            .WithMany()
            .HasForeignKey(d => d.InstitutionId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

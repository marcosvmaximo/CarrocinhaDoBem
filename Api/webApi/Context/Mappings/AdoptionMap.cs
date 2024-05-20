using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using webApi.Models;

namespace CarrocinhaDoBem.Api.Context.Mappings
{
    public class AdoptionMap : IEntityTypeConfiguration<Adoption>
    {
        public void Configure(EntityTypeBuilder<Adoption> builder)
        {
            builder.ToTable("Adoption");

            builder.HasKey(x => x.Id)
                .HasName("adoptionID");

            builder.Property(a => a.UserId)
                .HasColumnName("userId")
                .IsRequired();

            builder.Property(a => a.AnimalId)
                .HasColumnName("animalId")
                .IsRequired();

            builder.Property(a => a.AdoptionDate)
                .HasColumnName("adoptionDate")
                .HasColumnType("DATE")
                .IsRequired();

            builder.Property(a => a.AdoptionStatus)
                .HasColumnName("adoptionStatus")
                .IsRequired();

            // Define o relacionamento com a tabela Animal
            builder.HasOne(a => a.Animal)
                .WithMany()
                .HasForeignKey(a => a.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);

            // Define o relacionamento com a tabela User
            builder.HasOne(a => a.User)
                .WithMany()
                .HasForeignKey(a => a.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
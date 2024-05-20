using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using webApi.Models;

namespace CarrocinhaDoBem.Api.Context.Mappings
{
    public class SponsorshipMap : IEntityTypeConfiguration<Sponsorship>
    {
        public void Configure(EntityTypeBuilder<Sponsorship> builder)
        {
            builder.ToTable("Sponsorship");

            builder.HasKey(x => x.Id)
                .HasName("sponsorshipID");

            builder.Property(s => s.UserId)
                .HasColumnName("userId")
                .IsRequired();

            builder.Property(s => s.AnimalId)
                .HasColumnName("animalId")
                .IsRequired();

            builder.Property(s => s.InitialDate)
                .HasColumnName("initialDate")
                .HasColumnType("DATE")
                .IsRequired();

            builder.Property(s => s.EndDate)
                .HasColumnName("endDate")
                .HasColumnType("DATE")
                .IsRequired();

            builder.Property(s => s.SponsorshipValue)
                .HasColumnName("sponsorshipValue")
                .IsRequired();

            builder.Property(s => s.SponsorshipType)
                .HasColumnName("sponsorshipType")
                .HasMaxLength(20);

            // Define o relacionamento com a tabela Animal
            builder.HasOne(s => s.Animal)
                .WithMany()
                .HasForeignKey(s => s.AnimalId)
                .OnDelete(DeleteBehavior.Cascade);

            // Define o relacionamento com a tabela User
            builder.HasOne(s => s.User)
                .WithMany()
                .HasForeignKey(s => s.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
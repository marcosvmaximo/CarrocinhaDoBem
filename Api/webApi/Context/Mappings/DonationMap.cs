using webApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CarrocinhaDoBem.Api.Context.Mappings;

public class DonationMap : IEntityTypeConfiguration<Donation>
{
    public void Configure(EntityTypeBuilder<Donation> builder)
    {
        builder.ToTable("Donation");
        
        builder.HasKey(x => x.Id)
            .HasName("DonationID");

        builder.Property(d => d.UserId)
            .HasColumnName("UserID")
            .IsRequired();

        builder.Property(d => d.InstitutionId)
            .HasColumnName("InstitutionID")
            .IsRequired();

        builder.Property(d => d.DonationValue)
            .HasColumnName("DonationValue")
            .HasColumnType("double")
            .IsRequired();
        
        builder.Property(d => d.DonationDate)
            .HasColumnName("DonationDate")
            .HasColumnType("date")
            .IsRequired();
        
        builder.Property(d => d.Description)
            .HasColumnName("Description")
            .HasColumnType("varchar(200)")
            .HasMaxLength(200)
            .IsRequired();

        // Define o relacionamento com a tabela Institution
        builder.HasOne(d => d.Institution)
            .WithMany()
            .HasForeignKey(d => d.InstitutionId)
            .OnDelete(DeleteBehavior.Cascade);

        // Define o relacionamento com a tabela User
        builder.HasOne(d => d.User)
            .WithMany()
            .HasForeignKey(d => d.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
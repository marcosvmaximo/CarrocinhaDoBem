using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using webApi.Models;

namespace CarrocinhaDoBem.Api.Context.Mappings
{
    public class InstitutionMap : IEntityTypeConfiguration<Institution>
    {
        public void Configure(EntityTypeBuilder<Institution> builder)
        {
            builder.ToTable("Institution");

            builder.HasKey(x => x.Id)
                .HasName("institutionID");

            builder.Property(i => i.InstitutionCNPJ)
                .HasColumnName("institutionCNPJ")
                .IsRequired()
                .HasMaxLength(14);

            builder.Property(i => i.InstitutionName)
                .HasColumnName("institutionName")
                .IsRequired()
                .HasMaxLength(100);
        }
    }
}
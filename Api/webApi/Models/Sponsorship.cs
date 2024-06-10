using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using webApi.Models.Base;
using Microsoft.AspNetCore.Identity;

namespace webApi.Models
{
    public class Sponsorship : ModelBase
    {
        [Required(ErrorMessage = "O ID do usuário é obrigatório ")]
        public int UserId { get; set; }

        [Required(ErrorMessage = "O ID do animal é obrigatório ")]
        public int AnimalId { get; set; }

        [Required(ErrorMessage = "A data inicial da patrocínio é obrigatória.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime InitialDate { get; set; }

        [Required(ErrorMessage = "A data final da patrocínio é obrigatória.")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime EndDate { get; set; }

        [Required(ErrorMessage = "O valor da patrocínio é obrigatório.")]
        [Range(0, double.MaxValue, ErrorMessage = "O valor da patrocínio deve ser um número positivo.")]
        public double SponsorshipValue { get; set; }

        [StringLength(20, ErrorMessage = "O tipo de patrocínio não pode ter mais de 20 caracteres.")]
        public string SponsorshipType { get; set; }

        // Relacionamento com a tabela Animal - ignorar na entrada
        [JsonIgnore]
        public virtual Animal Animal { get; set; }

        // Relacionamento com a tabela User - ignorar na entrada
        [JsonIgnore]
        public virtual User User { get; set; }

        // Propriedades auxiliares para a saída
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual Animal AnimalOutput => Animal;

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public virtual User UserOutput => User;
    }
}

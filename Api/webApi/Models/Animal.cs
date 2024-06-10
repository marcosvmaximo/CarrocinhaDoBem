using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using webApi.Models.Base;
using Microsoft.AspNetCore.Identity;
using webApi.Models.Enum;

namespace webApi.Models;

public class Animal : ModelBase
{
    [Required(ErrorMessage = "O ID da instituição é obrigatório.")]
    public int InstitutionId { get; set; }

    [DisplayName("Nome")]
    [Required(ErrorMessage = "O nome do animal é obrigatório.")]
    [StringLength(100, ErrorMessage = "O nome do animal não pode ter mais de 100 caracteres.")]
    public string Name { get; set; }

    [DisplayName("Sexo")]
    [Required(ErrorMessage = "O Sexo é obrigatório.")]
    public ESexoAnimal Sex{ get; set; }

    [DisplayName("Porte")]
    [Required(ErrorMessage = "O Porte é obrigatório.")]
    [Range(0, double.MaxValue, ErrorMessage = "O tamanho do animal deve ser um número positivo.")]
    public EPorteAnimal PetSize { get; set; }

    [DisplayName("Data de Nascimento")]
    [Required(ErrorMessage = "A Data de Nascimento é obrigatória.")]
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime BirthDate { get; set; }

    [DisplayName("Data de Resgate")]
    [Required(ErrorMessage = "A data de resgate é obrigatória.")]
    [DataType(DataType.Date)]
    [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
    public DateTime RescueDate { get; set; }

    [DisplayName("Raça")]
    [Required(ErrorMessage = "A Raça é obrigatória.")]
    [StringLength(50, ErrorMessage = "A raça do animal não pode ter mais de 50 caracteres.")]
    public string Breed { get; set; }

    [DisplayName("Espécie")]
    [Required(ErrorMessage = "A Espécie é obrigatório.")]
    [StringLength(50, ErrorMessage = "A Espécie não pode ter mais de 50 caracteres.")]
    public EEspecieAnimal Species { get; set; }

    [DisplayName("Descrição")]
    [StringLength(100, ErrorMessage = "A Descrição não pode ter mais de 100 caracteres.")]
    public string Description { get; set; }

    [DisplayName("Foto")]
    public byte[]? AnimalPic { get; set; }

    public bool Status { get; set; }

    public virtual Institution Institution { get; set; }
}

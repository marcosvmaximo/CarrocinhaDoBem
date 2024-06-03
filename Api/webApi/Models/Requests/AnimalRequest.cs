using webApi.Models.Enum;

namespace webApi.Models.Requests;

public class AnimalRequest
{
  public int InstitutionId { get; set; }
  public string Name { get; set; }
  public ESexoAnimal Sex{ get; set; }
  public EPorteAnimal PetSize { get; set; }
  public DateTime BirthDate { get; set; }
  public DateTime RescueDate { get; set; }
  public string Breed { get; set; }
  public EEspecieAnimal Species { get; set; }
  public string Description { get; set; }
}

export class Animal {
  id?: number;  // Este campo é opcional porque o ID é gerado pelo backend
  institutionId!: number;
  petSize?: number;  // Usar number para PetSize
  animalAge!: string;  // Usar string para datas
  rescueDate!: string; // Usar string para datas
  animalName!: string;
  breed?: string;
  color?: string;
  animalType!: string;
  animalPic?: string; // Usar string para a URL da imagem
}

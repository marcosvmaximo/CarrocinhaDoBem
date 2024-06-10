import { IAnimal } from '../../catalogo-adocao/model/IAnimal';

export interface IApadrinhamento {
  id?: number;
  initialDate?: string; // Usar string para datas
  endDate?: string; // Usar string para datas
  sponsorshipValue?: number; // Usar number para valores
  sponsorshipType?: string;
  animal?: IAnimal; // Adicionar esta linha para a relação com IAnimal
  animalId: number; // Use animalId instead of animal
  userId: number; 
  status?: string;
  
}

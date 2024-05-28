
export class Sponsorship {
  id?: number;
  userId: number;
  animalId: number;
  initialDate: string; // Usar string para datas
  endDate: string; // Usar string para datas
  sponsorshipValue: number; // Usar number para valores
  sponsorshipType: string;

  constructor(
    userId: number,
    animalId: number,
    initialDate: string,
    endDate: string,
    sponsorshipValue: number,
    sponsorshipType: string
  ) {
    this.userId = userId;
    this.animalId = animalId;
    this.initialDate = initialDate;
    this.endDate = endDate;
    this.sponsorshipValue = sponsorshipValue;
    this.sponsorshipType = sponsorshipType;
  }
}
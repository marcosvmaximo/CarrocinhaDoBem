import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Animal } from '../../models/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private apiUrl = 'https://localhost:7240/api/animals';

  constructor(private http: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getAnimalById(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createAnimal(animal: Animal, animalPic: File): Observable<Animal> {
    const formData: FormData = new FormData();
    formData.append('animalPic', animalPic);
    Object.keys(animal).forEach(key => {
      formData.append(key, (animal as any)[key]);
    });

    return this.http.post<Animal>(this.apiUrl, formData).pipe(
      catchError(this.handleError),
      map((response: any) => {
        // Adicione a URL da imagem à resposta do servidor
        return { ...response, animalPicUrl: `${this.apiUrl}/${response.id}/image` };
      })
    );
  }

  updateAnimal(id: number, animal: Animal, animalPic?: File): Observable<any> {
    const formData: FormData = new FormData();
    if (animalPic) {
      formData.append('animalPic', animalPic);
    }
    Object.keys(animal).forEach(key => {
      formData.append(key, (animal as any)[key]);
    });

    return this.http.put(`${this.apiUrl}/${id}`, formData).pipe(
      catchError(this.handleError)
    );
  }

  deleteAnimal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obter a URL da imagem do animal
  getAnimalImageUrl(id: number): string {
    return `${this.apiUrl}/${id}/image`;
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Erro no cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Erro no servidor
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}

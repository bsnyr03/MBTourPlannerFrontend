import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from '../models/tour.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private readonly BASE_URL = 'http://localhost:8080/api/tours';

  constructor(private http: HttpClient) {}

  getAllTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.BASE_URL);
  }

  getTourById(id: number): Observable<Tour> {
    return this.http.get<Tour>(`${this.BASE_URL}/${id}`);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.BASE_URL, tour);
  }

  updateTour(tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.BASE_URL}/${tour.id}`, tour);
  }

  deleteTour(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}

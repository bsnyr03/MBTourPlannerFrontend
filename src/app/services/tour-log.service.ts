import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TourLog } from '../models/tour-log.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourLogService {

  private readonly BASE_URL = 'http://localhost:8080/api/tours';

  constructor(private http: HttpClient) {}

  getLogs(tourId: number): Observable<TourLog[]> {
    return this.http.get<TourLog[]>(`${this.BASE_URL}/${tourId}/tour_logs`);
  }

  getLog(tourId: number, logId: number): Observable<TourLog> {
    return this.http.get<TourLog>(`${this.BASE_URL}/${tourId}/tour_logs/${logId}`);
  }

  createLog(tourId: number, log: TourLog): Observable<TourLog> {
    return this.http.post<TourLog>(`${this.BASE_URL}/${tourId}/tour_logs`, log);
  }

  updateLog(tourId: number, logId: number, log: TourLog): Observable<TourLog> {
    return this.http.put<TourLog>(`${this.BASE_URL}/${tourId}/tour_logs/${logId}`, log);
  }

  deleteLog(tourId: number, logId: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${tourId}/tour_logs/${logId}`);
  }
}

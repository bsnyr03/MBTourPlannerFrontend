import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tour } from '../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private toursSubject = new BehaviorSubject<Tour[]>([
    { id: 1, name: 'Alpen Adventure', description: 'Scenic mountain route', from: 'Salzburg', to: 'Innsbruck', transportType: 'Car' },
    { id: 2, name: 'Donau-Radtour', description: 'Bike trip along the Danube', from: 'Linz', to: 'Wien', transportType: 'Bike' }
  ]);

  getTours(): Observable<Tour[]> {
    return this.toursSubject.asObservable();
  }

  getTourById(id: number): Tour | undefined {
    return this.toursSubject.getValue().find(t => t.id === id);
  }

  addTour(tour: Tour): void {
    const current = this.toursSubject.getValue();
    tour.id = this.getNextId(current);
    this.toursSubject.next([...current, tour]);
  }

  updateTour(updated: Tour): void {
    const updatedList = this.toursSubject.getValue().map(t =>
      t.id === updated.id ? updated : t
    );
    this.toursSubject.next(updatedList);
  }

  private getNextId(tours: Tour[]): number {
    return tours.length > 0 ? Math.max(...tours.map(t => t.id)) + 1 : 1;
  }
  deleteTour(id: number): void {
    const updated = this.toursSubject.getValue().filter(t => t.id !== id);
    this.toursSubject.next(updated);
  }

}

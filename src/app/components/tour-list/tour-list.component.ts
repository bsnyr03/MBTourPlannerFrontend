import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent {
  tours$!: Observable<Tour[]>;

  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.tourService.getAllTours().subscribe(tours => {
      console.log('Geladene Touren:', tours);

      // Wandelt Array in Observable um
      this.tours$ = new Observable(observer => {
        observer.next(tours);
        observer.complete();
      });
    });
  }

  deleteTour(id: number): void {
    this.tourService.deleteTour(id).subscribe(() => {
      this.loadTours();
    });
  }
}

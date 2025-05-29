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
    this.tours$ = this.tourService.getAllTours();
  }

  deleteTour(id: number): void {
    this.tourService.deleteTour(id).subscribe(() => {
      this.loadTours();
    });
  }
}

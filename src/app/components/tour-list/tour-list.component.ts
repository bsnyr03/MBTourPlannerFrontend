import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  searchTerm: string = '';
  selectedTour?: Tour;

  selectTour(tour: Tour): void {
    this.selectedTour = tour;
  }


  constructor(private tourService: TourService) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.tourService.getAllTours().subscribe(tours => {
      this.tours = tours;
      this.filterTours();
    });
  }

  filterTours(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredTours = this.tours.filter(tour =>
      tour.name.toLowerCase().includes(term)
    );
  }

  deleteTour(id: number | undefined): void {
    if (!id) return;
    this.tourService.deleteTour(id).subscribe(() => {
      this.tours = this.tours.filter(t => t.id !== id);
      this.filterTours();
      this.selectedTour = undefined; 
    });
  }

}

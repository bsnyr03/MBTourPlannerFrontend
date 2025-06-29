import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';

@Component({
  selector: 'app-tour-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tour-editor.component.html',
  styleUrls: ['./tour-editor.component.scss']
})
export class TourEditorComponent {
  tour!: Tour;
  isEdit = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private router: Router
  ) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEdit = true;
      const id = Number(idParam);
      this.tourService.getTourById(id).subscribe((data) => {
        this.tour = data;
        this.isLoading = false;
      });
    } else {
      this.tour = {
        name: '',
        description: '',
        fromLocation: '',
        toLocation: '',
        transportType: '',
        distance: 0,
        estimatedTime: '',
        routeImageUrl: '',
        popularity: 50,
        childFriendliness: 5.0
      };
      this.isLoading = false;
    }
  }

  save(): void {
    if (this.isEdit && this.tour.id) {
      this.tourService.updateTour(this.tour).subscribe(() => {
        this.router.navigate(['/tours']);
      });
    } else {
      this.tourService.addTour(this.tour).subscribe(() => {
        this.router.navigate(['/tours']);
      });
    }
  }
}

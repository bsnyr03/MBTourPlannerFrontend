import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Tour } from '../../models/tour.model';
import { TourService } from '../../services/tour.service';

@Component({
  selector: 'app-tour-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tour-editor.component.html',
  styleUrls: ['./tour-editor.component.scss']
})
export class TourEditorComponent {
  tour: Tour = {
    id: 0,
    name: '',
    description: '',
    from: '',
    to: '',
    transportType: ''
  };

  isEdit = false;

  constructor(private route: ActivatedRoute, private tourService: TourService, private router: Router) {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      const found = this.tourService.getTourById(id);
      if (found) {
        this.tour = { ...found };
        this.isEdit = true;
      }
    }
  }

  save(): void {
    if (this.isEdit) {
      this.tourService.updateTour(this.tour);
    } else {
      this.tourService.addTour(this.tour);
    }
    this.router.navigate(['/tours']);
  }
}

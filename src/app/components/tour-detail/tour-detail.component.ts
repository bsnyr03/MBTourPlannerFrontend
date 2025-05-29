import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { Observable, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent {
  tour$!: Observable<Tour | undefined>;

  constructor(private route: ActivatedRoute, private tourService: TourService) {
    this.tour$ = this.route.paramMap.pipe(
      map((params: ParamMap) => Number(params.get('id'))),
      switchMap((id: number) => this.tourService.getTourById(id))
    );
  }
}

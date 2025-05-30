import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { TourLogService } from '../../services/tour-log.service';
import { TourLog } from '../../models/tour-log.model';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-tour-log-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './tour-log-list.component.html',
  styleUrls: ['./tour-log-list.component.scss']
})
export class TourLogListComponent {
  logs$!: Observable<TourLog[]>;
  tourId!: number;

  constructor(private route: ActivatedRoute, private tourLogService: TourLogService) {
    this.logs$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.tourId = Number(params.get('id'));
        return this.tourLogService.getLogs(this.tourId);
      })
    );
  }
}

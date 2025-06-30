import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TourLogService } from '../../services/tour-log.service';
import { TourLog } from '../../models/tour-log.model';

@Component({
  selector: 'app-tour-log-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tour-log-editor.component.html',
  styleUrls: ['./tour-log-editor.component.scss']
})
export class TourLogEditorComponent {
  tourId!: number;
  logId?: number;
  isEdit = false;

  log: TourLog = {
    id: undefined,
    logDateTime: '',
    comment: '',
    difficulty: 1,
    totalDistance: 0,
    totalTime: '',
    rating: 1
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourLogService: TourLogService
  ) {
    this.tourId = Number(this.route.snapshot.paramMap.get('tourId'));
    const logIdParam = this.route.snapshot.paramMap.get('logId');

    if (logIdParam) {
      this.isEdit = true;
      this.logId = Number(logIdParam);
      this.tourLogService.getLog(this.tourId, this.logId).subscribe(data => {
        this.log = {
          ...data,
          // ISO_LOCAL_DATE_TIME → auf Sekunden genau stutzen
          logDateTime: data.logDateTime?.substring(0, 16)  // "2025-05-30T14:11"
        };
      });
    }
  }

  save(): void {

    const minutes = parseInt(this.log.totalTime, 10);
    const duration = isNaN(minutes) ? 'PT0M' : `PT${minutes}M`;

    const payload: TourLog = {
      ...this.log,
      totalTime: duration
    };

    if (this.isEdit && this.logId != null) {
      this.tourLogService.updateLog(this.tourId, this.logId, this.log).subscribe(() => {
        this.router.navigate(['/tours', this.tourId, 'logs']);
      });
    } else {
      this.tourLogService.createLog(this.tourId, this.log).subscribe(() => {
        this.router.navigate(['/tours', this.tourId, 'logs']);
      });
    }
  }
}

import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tour-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-reports.component.html',
  styleUrls: ['./tour-reports.component.scss']
})
export class TourReportsComponent implements OnInit {

  tours: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/api/tours').subscribe(tours => {
      this.tours = tours;
    });
  }

  downloadTourReport(tourId: number): void {
    this.http.get(`http://localhost:8080/api/reports/tour/${tourId}`, { responseType: 'blob' })
      .subscribe(blob => this.download(blob, `tour-${tourId}-report.pdf`));
  }

  downloadSummaryReport(): void {
    this.http.get('http://localhost:8080/api/reports/summary', { responseType: 'blob' })
      .subscribe(blob => this.download(blob, 'summary-report.pdf'));
  }

  private download(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }
}

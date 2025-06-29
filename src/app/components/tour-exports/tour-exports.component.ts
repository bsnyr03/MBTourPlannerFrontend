import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-tour-exports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-exports.component.html',
  styleUrl: './tour-exports.component.scss'
})
export class TourExportsComponent {
  constructor(private http: HttpClient) {
  }

  exportJson(): void {
    this.http.get<Blob>('http://localhost:8080/api/tours/export', { responseType: 'blob' as 'json' })
      .subscribe(blob => this.downloadFile(blob, 'tours.json'));
  }

  exportCsv(): void {
    this.http.get<Blob>('http://localhost:8080/api/tours/export/csv', { responseType: 'blob' as 'json' })
      .subscribe(blob => this.downloadFile(blob, 'tours.csv'));
  }

  private downloadFile(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

}

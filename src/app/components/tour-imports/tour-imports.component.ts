import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tour-imports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tour-imports.component.html',
  styleUrl: './tour-imports.component.scss'
})
export class TourImportsComponent {

  constructor(private http: HttpClient) {}

  importCsv(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const formData = new FormData();
    formData.append('file', input.files[0]);

    this.http.post('http://localhost:8080/api/tours/import/csv', formData)
      .subscribe({
        next: res => console.log('Import successful:', res),
        error: err => console.error('Import failed:', err)
      });
  }

}

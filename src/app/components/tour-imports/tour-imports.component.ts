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
  message: string | null = null;
  isSuccess: boolean | null = null;

  constructor(private http: HttpClient) {}

  importCsv(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const formData = new FormData();
    formData.append('file', input.files[0]);

    this.http.post<{ imported: number; status: number }>(
      'http://localhost:8080/api/tours/import/csv',
      formData
    ).subscribe({
      next: res => {
        this.isSuccess = true;
        this.message = `Import erfolgreich: ${res.imported} Touren importiert.`;
      },
      error: err => {
        this.isSuccess = false;
        this.message = 'Import fehlgeschlagen. Bitte überprüfe die Datei.';
        console.error(err);
      }
    });
  }

  importJson(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);
        this.http.post<{ imported: number; status: number }>(
          'http://localhost:8080/api/tours/import',
          jsonData
        ).subscribe({
          next: res => {
            this.isSuccess = true;
            this.message = `JSON-Import erfolgreich: ${res.imported} Touren importiert.`;
          },
          error: err => {
            this.isSuccess = false;
            this.message = 'JSON-Import fehlgeschlagen.';
            console.error(err);
          }
        });
      } catch (err) {
        this.isSuccess = false;
        this.message = 'Ungültige JSON-Datei.';
      }
    };
    reader.readAsText(input.files[0]);
  }

}

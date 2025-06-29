import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {Tour} from "../../models/tour.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-tour-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.scss']
})
export class TourSearchComponent implements OnInit {
  searchTerm: string = '';
  tours: Tour[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchAllTours(); // zeigt beim Start alle Touren
  }

  search(): void {
    if (!this.searchTerm.trim()) {
      this.fetchAllTours();
      return;
    }

    this.http.get<Tour[]>(`http://localhost:8080/api/tours/search?q=${this.searchTerm}`)
      .subscribe(tours => this.tours = tours);
  }

  private fetchAllTours(): void {
    this.http.get<Tour[]>('http://localhost:8080/api/tours')
      .subscribe(tours => this.tours = tours);
  }
}

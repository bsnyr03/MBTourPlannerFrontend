import {Component, ElementRef, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { FormsModule } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import * as L from 'leaflet';
import {environment} from "../../../environments/environments";

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss']
})
export class TourListComponent {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  searchTerm: string = '';
  selectedTour?: Tour;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;


  private map: any;
  private routeLayer: any;

  selectTour(tour: Tour): void {
    this.selectedTour = tour;
    setTimeout(() => {
      this.initMap();
      this.displayRoute(tour.fromLocation, tour.toLocation);
    }, 0);
  }


  constructor(private tourService: TourService, private router: Router,  private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTours();
  }

  goToTourDetail(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/tours', id]);
  }

  loadTours(): void {
    this.tourService.getAllTours().subscribe(tours => {
      this.tours = tours;
      this.filterTours();
    });
  }

  filterTours(): void {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredTours = this.tours.filter(tour =>
      tour.name.toLowerCase().includes(term)
    );
  }

  deleteTour(id: number | undefined): void {
    if (!id) return;
    this.tourService.deleteTour(id).subscribe(() => {
      this.tours = this.tours.filter(t => t.id !== id);
      this.filterTours();
      this.selectedTour = undefined;
    });
  }

  private initMap(): void {
    if (this.map) {
      this.map.remove(); // Falls Map schon existiert
    }

    this.map = L.map('map').setView([48.2082, 16.3738], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private async displayRoute(from: string, to: string): Promise<void> {
    const apiKey = environment.orsApiKey;

    const geocode = async (place: string): Promise<[number, number]> => {
      const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(place)}`;
      const res: any = await this.http.get(url).toPromise();
      const coords = res.features[0].geometry.coordinates;
      return [coords[1], coords[0]];
    };

    try {
      const [fromCoords, toCoords] = await Promise.all([geocode(from), geocode(to)]);
      const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${fromCoords[1]},${fromCoords[0]}&end=${toCoords[1]},${toCoords[0]}`;
      const data: any = await this.http.get(url).toPromise();

      const coords = data.features[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
      this.routeLayer = L.polyline(coords, { color: 'blue' }).addTo(this.map);
      this.map.fitBounds(this.routeLayer.getBounds());
    } catch (err) {
      console.error('Fehler bei Routenanzeige', err);
    }
  }
  formatEstimatedTime(duration: string | undefined): string {
    if (!duration) return '';

    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);

    if (!match) return duration;

    const hours = match[1] ? `${match[1]}h` : '';
    const minutes = match[2] ? `${match[2]}min` : '';

    return `${hours} ${minutes}`.trim();
  }


}

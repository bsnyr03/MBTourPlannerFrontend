import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, ParamMap, Router, RouterModule} from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { map, switchMap } from 'rxjs/operators';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';
import {environment} from "../../../environments/environments";
import {tileLayer} from "leaflet";

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit, AfterViewInit {
  tour?: Tour;
  private map: any;
  private routeLayer: any;
  private tileBlob: Blob = new Blob;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => Number(params.get('id'))),
      switchMap((id: number) => this.tourService.getTourById(id))
    ).subscribe(tour => {
      if (tour) {
        this.tour = tour;
        setTimeout(() => {
          this.initMap();
          this.displayRoute(tour.fromLocation, tour.toLocation);
        }, 0);
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.map && this.routeLayer && this.tour?.id) {
      (this.map, (err: any, canvas: { toBlob: (arg0: (blob: Blob) => void) => void; }) => {
        if (err) {
          console.error('leafletImage error', err);
          return;
        }
        canvas.toBlob((blob: Blob) => {
          if (!blob) return;
          const form = new FormData();
          form.append('file', blob, 'route.png');
          this.http.post(`/api/tours/${this.tour!.id}/image`, form).subscribe({
            next: () => console.log('Map image uploaded'),
            error: e => console.error('Upload failed', e)
          });
        });
      });
    }
  }

  deleteTour(id?: number): void {
    if (!id) return;
    if (confirm('Möchtest du diese Tour wirklich löschen?')) {
      this.tourService.deleteTour(id).subscribe(() => {
        this.router.navigate(['/tours']);
      });
    }
  }


  private initMap(): void {
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
}

import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, ParamMap, Router, RouterModule} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {Tour} from '../../models/tour.model';
import {map, switchMap} from 'rxjs/operators';
import * as L from 'leaflet';
import {HttpClient} from '@angular/common/http';
import {environment} from "../../../environments/environments";

declare let html2canvas: any;

@Component({
  selector: 'app-tour-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tour-detail.component.html',
  styleUrls: ['./tour-detail.component.scss']
})
export class TourDetailComponent implements OnInit {
  @ViewChild('mapContainer', {static: true}) mapContainer!: ElementRef;
  tour?: Tour;
  private map: any;
  private routeLayer: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tourService: TourService,
    private http: HttpClient
  ) {
  }

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
    }).addTo(this.map)
      .on('titleload', () => {
        this.maybeCaptureAndUploadMapImage();
      });
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
      this.routeLayer = L.polyline(coords, {color: 'blue'}).addTo(this.map);
      this.map.fitBounds(this.routeLayer.getBounds());

      this.maybeCaptureAndUploadMapImage();

    } catch (err) {
      console.error('Fehler bei Routenanzeige', err);
    }
  }

  private tileCount = 0;
  private totalTiles = 0;
  private routeDrawn = false;

  private maybeCaptureAndUploadMapImage(): void {
    const tiles = this.mapContainer.nativeElement.querySelectorAll('img.leaflet-tile') as NodeListOf<HTMLImageElement>;

    this.totalTiles = tiles.length;
    this.tileCount = Array.from(tiles).filter((img) => img.complete).length;
    this.routeDrawn = !!this.routeLayer;

    if (this.routeDrawn && this.tileCount === this.totalTiles) {
      this.captureAndUpload();
    }
  }

  private captureAndUpload(): void {
    import('html2canvas').then((mod) => {
      mod.default(this.mapContainer.nativeElement).then((canvas: HTMLCanvasElement) => {
        canvas.toBlob((blob: Blob | null) => {
          if (!blob || !this.tour) return;
          const form = new FormData();
          form.append('file', blob, `tour-${this.tour.id}.png`);
          this.http
            .post<void>(`api/tours/${this.tour.id}/image`, form)
            .subscribe({
              next: () => console.log('Bild erfolgreich hochgeladen'),
              error: (err) => console.error('Fehler beim Hochladen des Bildes', err)
            });
        }, 'image/png');
      });
    });
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

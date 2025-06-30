#  TourPlanner – Projektübersicht

##  Projektziel

**TourPlanner** ist eine Angular-basierte Webanwendung, mit der man Touren planen, verwalten, analysieren und exportieren kann. Die Anwendung ist über ein Spring Boot-Backend verbunden, das die Daten persistiert. Sie bietet ein vollständiges Tour- und Log-Management inklusive CSV/JSON-Import/Export und PDF-Bericht-Generierung.

---

## Frontend-Struktur (Angular)

Der Code ist in einem `components`, `models` und `services` Ordner sauber gegliedert. Jede Funktionalität wird durch eine **eigene Component** abgebildet, was für Übersichtlichkeit und Wartbarkeit sorgt.

### Components

| Component                | Beschreibung                                                                 |
|--------------------------|------------------------------------------------------------------------------|
| `home`                   | Startseite mit Schnellzugriff auf alle Hauptfunktionen                       |
| `main-layout`            | Container-Komponente mit Sidebar (Navigation) und dynamischem Content-Bereich |
| `tour-list`              | Zeigt alle gespeicherten Touren                                              |
| `tour-detail`            | Detailansicht einer Tour mit Route und Map                                   |
| `tour-editor`            | Formular zum Erstellen oder Bearbeiten einer Tour                            |
| `tour-log-list`          | Zeigt Logs für eine bestimmte Tour                                           |
| `tour-log-editor`        | Formular zur Erstellung/Bearbeitung einzelner Logs                           |
| `tour-exports`           | Exportfunktion (JSON/CSV) für alle Touren                                    |
| `tour-imports`           | Importfunktion für JSON und CSV-Dateien                                      |
| `tour-reports`           | Generierung von PDF-Reports                                                  |
| `tour-search`            | Suchansicht, mit Anbindung an die Backend-Suchfunktion                       |

---

## Navigation – `main-layout.component.html`

Die Sidebar ist in jeder Ansicht sichtbar und enthält alle wichtigen Navigationslinks:

```html
<aside class="sidebar">
  <nav>
    <h1 class="logo">TourPlanner</h1>
    <ul>
      <li><a routerLink="/home">Home</a></li>
      <li><a routerLink="/search">Search</a></li>
      <li><a routerLink="/tours">Tour List</a></li>
      <li><a routerLink="/add-tour">Add Tour</a></li>
      <li><a routerLink="/import">Import Tour File</a></li>
      <li><a routerLink="/export">Export Tour File</a></li>
      <li><a routerLink="/reports">Reports</a></li>
    </ul>
  </nav>
</aside>
```

Der Inhaltsbereich (`<router-outlet>`) wird automatisch mit dem gewählten Untermodul geladen.

---

## Routing – `app.routes.ts`

Das Routing ist so konfiguriert, dass **alle Komponenten als Children** der `MainLayoutComponent` geladen werden. Damit bleibt die Sidebar immer sichtbar.

```ts
export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'search', component: TourSearchComponent },
      { path: 'tours', component: TourListComponent },
      { path: 'tours/:id', component: TourDetailComponent },
      { path: 'edit-tour/:id', component: TourEditorComponent },
      { path: 'add-tour', component: TourEditorComponent },
      { path: 'tours/:id/logs', component: TourLogListComponent },
      { path: 'tours/:tourId/logs/create', component: TourLogEditorComponent },
      { path: 'tours/:tourId/logs/:logId/edit', component: TourLogEditorComponent },
      { path: 'export', component: TourExportsComponent },
      { path: 'import', component: TourImportsComponent },
      { path: 'reports', component: TourReportsComponent },
      { path: '**', redirectTo: 'home' }
    ]
  }
];
```

---

## Backend-Anbindung

### Services:

- `tour.service.ts`: Enthält alle Tour-Operationen (`getAllTours()`, `getTourById()`, `addTour()`, etc.)
- `tour-log.service.ts`: Bietet Methoden zur Verwaltung von TourLogs für jede Tour.
- Die Services verwenden `HttpClient`, um mit dem Backend (`http://localhost:8080/api/...`) zu kommunizieren.

### Beispiel für einen API-Aufruf:

```ts
this.http.get<Tour[]>(`${this.BASE_URL}`); // GET /api/tours
this.http.post(`${this.BASE_URL}/import`, data); // POST /api/tours/import
```

---

##  Features im Überblick

-  **Tour-CRUD** mit Formularvalidierung
-  **Tour-Logs** pro Tour
-  **Import/Export** als JSON und CSV
-  **PDF-Reports** über einzelne oder mehrere Touren
-  **Backend-basierte Suche**
-  **Kartendarstellung mit OpenRouteService**

---

##  Backend

Das Spring Boot Backend bietet alle Endpunkte unter `/api/tours` und `/api/reports` an und persistiert die Daten in einer SQL-Datenbank. Die Touren und Logs werden über DTOs und Entities konvertiert und sind vollständig validiert.

---

##  Fazit

Der TourPlanner wurde sauber und modular mit Angular aufgebaut. Durch die Verwendung von Services, Modellen, sauberem Routing und wiederverwendbaren Komponenten wurde eine klare und stabile Codebasis geschaffen. Die Navigation ist benutzerfreundlich, alle Funktionen erreichbar, und die API-Kommunikation ist robust und sicher integriert.

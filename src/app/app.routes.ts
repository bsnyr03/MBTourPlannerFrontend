import { Routes } from '@angular/router';

import { TourListComponent } from './components/tour-list/tour-list.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { TourEditorComponent } from './components/tour-editor/tour-editor.component';
import { TourLogListComponent } from './components/tour-log-list/tour-log-list.component';
import {TourLogEditorComponent} from "./components/tour-log-editor/tour-log-editor.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {TourExportsComponent} from "./components/tour-exports/tour-exports.component";
import {TourImportsComponent} from "./components/tour-imports/tour-imports.component";
import {TourReportsComponent} from "./components/tour-reports/tour-reports.component";

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
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
      { path: '**', redirectTo: 'tours' }
    ]
  }
];

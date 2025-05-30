import { Routes } from '@angular/router';

import { TourListComponent } from './components/tour-list/tour-list.component';
import { TourDetailComponent } from './components/tour-detail/tour-detail.component';
import { TourEditorComponent } from './components/tour-editor/tour-editor.component';
import { TourLogListComponent } from './components/tour-log-list/tour-log-list.component';
import {TourLogEditorComponent} from "./components/tour-log-editor/tour-log-editor.component";

export const routes: Routes = [
  { path: 'tours', component: TourListComponent },
  { path: 'tours/:id', component: TourDetailComponent },
  { path: 'edit-tour/:id', component: TourEditorComponent },
  { path: 'add-tour', component: TourEditorComponent },
  { path: 'tours/:id/logs', component: TourLogListComponent },
  { path: 'tours/:tourId/logs/create', component: TourLogEditorComponent },
  { path: 'tours/:tourId/logs/:logId/edit', component: TourLogEditorComponent },
  { path: '**', redirectTo: 'tours', pathMatch: 'full' }
];

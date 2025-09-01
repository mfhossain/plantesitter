import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Planteejer } from './pages/planteejer/planteejer';
import { Plantepasser } from './pages/plantepasser/plantepasser';
import { Survey } from './pages/survey/survey';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'planteejer', component: Planteejer },
  { path: 'plantepasser', component: Plantepasser },
  { path: 'survey', component: Survey },
  { path: '**', redirectTo: '' }
];

import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LabsComponent} from './pages/labs/labs.component';

//le dice a angular que componente rederizar en cada ruta
export const routes: Routes = [
  {
    path: '',
    component:HomeComponent
  },
  {
    path: 'labs',
    component:LabsComponent
  }
];

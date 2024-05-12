import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

export const routes: Routes = [
  {
    path: 'statistics/:formId',
    component: StatisticsComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'form/:formId', component: DynamicFormComponent },
];

import { Routes } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
  { path: 'form/:formId', component: DynamicFormComponent },
  {
    path: 'statistics/:formId',
    component: StatisticsComponent,
  },
];

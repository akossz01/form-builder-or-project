import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DynamicFormComponent } from './pages/dynamic-form/dynamic-form.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  {
    path: 'statistics/:formId',
    component: StatisticsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'form/:formId', component: DynamicFormComponent, canActivate: [AuthGuard] },
];

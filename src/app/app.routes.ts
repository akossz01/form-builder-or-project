import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent} from './statistics/statistics.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { AuthGuardLogin } from './services/login.guard';



export const routes: Routes = [
    {path: 'login', component: LoginComponent, canActivate:[AuthGuardLogin]},
    {path: 'statistics', component: StatisticsComponent,canActivate:[AuthGuard]},
    { path: 'form/:formId', component: DynamicFormComponent, canActivate:[AuthGuard]}
    
];

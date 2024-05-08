import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent} from './statistics/statistics.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';




export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'statistics', component: StatisticsComponent},
    { path: 'form/:formId', component: DynamicFormComponent }
    
];

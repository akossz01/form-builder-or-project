import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent} from './statistics/statistics.component';




export const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'statistics', component: StatisticsComponent}
];

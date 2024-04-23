import { Routes } from '@angular/router';
import { StatisticsComponent } from './statistics/statistics.component';

export const routes: Routes = [
    {
        path: 'statistics/:fromId',
        component: StatisticsComponent
    }
];
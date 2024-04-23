import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'form/:formId', component: DynamicFormComponent }

    {
        path: 'statistics/:fromId',
        component: StatisticsComponent
    }
];
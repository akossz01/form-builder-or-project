import { Routes } from '@angular/router';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';

export const routes: Routes = [
    { path: 'form/:formId', component: DynamicFormComponent }
];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'details/:id',
        component: StudentDetailsComponent
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
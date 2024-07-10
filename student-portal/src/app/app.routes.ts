import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { EditStudentComponent } from './pages/edit-student/edit-student.component';

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
    {
        path: 'edit/:id',
        component: EditStudentComponent 
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
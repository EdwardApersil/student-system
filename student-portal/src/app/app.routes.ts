import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';

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
    {
        path: 'admin-profile',
        component: AdminProfileComponent
    },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];
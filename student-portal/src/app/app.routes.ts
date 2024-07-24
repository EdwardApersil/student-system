import { Routes } from '@angular/router';
import { AdminGuard } from './auth/guard/admin.guard';
import { InternGuard } from './auth/guard/intern.guard';
import { LineManagerGuard } from './auth/guard/line-manager.guard';
import { LoginComponent } from './auth/login/login.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { AdminProfileComponent } from './pages/admin-profile/admin-profile.component';
import { HomeComponent } from './pages/home/home.component';
import { InternDashboardComponent } from './pages/intern-dashboard/intern-dashboard.component';
import { LineManagerComponent } from './pages/line-manager/line-manager.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
        // canActivate: [AdminGuard, LineManagerGuard, InternGuard] 
    },
    {
        path: 'details/:id',
        component: StudentDetailsComponent,
        // canActivate: [InternGuard]
    },
    {
        path: 'edit/:id',
        component: EditStudentComponent,
        // canActivate: [AdminGuard]
    },
    {
        path: 'admin-profile',
        component: AdminProfileComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'line-manager-profile',
        component: LineManagerComponent, 
        canActivate: [LineManagerGuard]
    },
    {
        path: 'intern-profile',
        component: InternDashboardComponent, 
        canActivate: [InternGuard]
    },
    {
        path: 'intern-dashboard',
        component: InternDashboardComponent, 
        // canActivate: [InternGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

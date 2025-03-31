import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KapcsolatComponent } from './components/kapcsolat/kapcsolat.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'',component:HomeComponent
    },
    {
        path:'login',component:LoginComponent
    },
    {
        path:'kapcsolat',component:KapcsolatComponent
    },
    {
        path:'rolunk',component:AboutComponent
    },
    {
        path:'dashboard', 
        component:DashboardComponent,
        canActivate: [authGuard]
    },
    
    { 
        path: '**', component:HomeComponent
    }
];

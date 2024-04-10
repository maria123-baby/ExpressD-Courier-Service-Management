import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
export const routes: Routes = [
{path: '',component:HomeComponent},
{path: 'login',component:LoginComponent},
{path: 'userdetails',component:UserdetailsComponent},
{path: 'dashboard',component:DashboardComponent},

];

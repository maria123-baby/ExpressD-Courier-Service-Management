import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
export const routes: Routes = [
{path: '',component:HomeComponent},
{path: 'login',component:LoginComponent},
<<<<<<< HEAD
{path: 'userdetails',component:UserdetailsComponent},
{path: 'dashboard',component:DashboardComponent},

=======
{path: 'dashboard',component:DashboardComponent},
{path: 'userdetails',component:UserdetailsComponent}
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
];

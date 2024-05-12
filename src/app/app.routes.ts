import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { TrackComponent } from './track/track.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './payment/payment.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
{path: '',component:HomeComponent},
{path:'services',component:ServicesComponent},
{path:'about',component:AboutComponent},
{path: 'register',component:RegisterComponent},
{path: 'login',component:LoginComponent},
{path: 'userdetails',component:UserdetailsComponent,canActivate:[AuthGuard]},
{path: 'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
{path:'track',component:TrackComponent,canActivate:[AuthGuard]},
{path: 'orderdetails',component:OrderdetailsComponent,canActivate:[AuthGuard]},
{path: 'payment',component:PaymentComponent,canActivate:[AuthGuard]},
{path: 'contact',component:ContactComponent},
];

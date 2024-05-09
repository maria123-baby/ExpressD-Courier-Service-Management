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

export const routes: Routes = [
{path: '',component:HomeComponent},
{path:'about',component:AboutComponent},
{path: 'register',component:RegisterComponent},
{path: 'login',component:LoginComponent},
{path: 'userdetails',component:UserdetailsComponent},
{path: 'dashboard',component:DashboardComponent},
{path:'track',component:TrackComponent},
{path:'services',component:ServicesComponent},
{path: 'orderdetails',component:OrderdetailsComponent},
{path: 'payment',component:PaymentComponent},
{path: 'contact',component:ContactComponent},
];

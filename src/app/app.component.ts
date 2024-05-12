import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { TrackComponent } from './track/track.component';
import { RegisterComponent } from './register/register.component';
import { PaymentComponent } from './payment/payment.component';
import { ServicesComponent } from './services/services.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet,
      HomeComponent,
      AboutComponent,
      PaymentComponent,
      ServicesComponent,
      LoginComponent,
      ReactiveFormsModule,
      UserdetailsComponent,
      CommonModule,NavbarComponent,
      RegisterComponent,TrackComponent,
      ContactComponent]
})

export class AppComponent {
  title = 'event';
}

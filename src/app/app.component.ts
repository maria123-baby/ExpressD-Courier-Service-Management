import { Component, OnInit, inject } from '@angular/core';
<<<<<<< HEAD
=======
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserdetailsComponent } from './userdetails/userdetails.component';
=======
import { AuthService } from './auth.service';
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
<<<<<<< HEAD
    imports: [RouterOutlet,HomeComponent,LoginComponent,ReactiveFormsModule,UserdetailsComponent,CommonModule,NavbarComponent]
})

export class AppComponent {
  title = 'Courier Service Management';
   Auth=inject(AngularFireAuth);
=======
    imports: [RouterOutlet, FormsModule,LoginComponent,CommonModule,HomeComponent,NavbarComponent,ReactiveFormsModule]
})

export class AppComponent implements OnInit{
  title = 'Courier Service Management';
  authService = inject(AuthService)
  ngOnInit(): void {
    this.authService.user$.subscribe(user=>{
      if(user){
        this.authService.currentUserSig.set({
          email:user.email!,
          username:user.displayName!,
          

        });
      }
      else{
        this.authService.currentUserSig.set(null);
      }
    });
  }
  logout():void{
    this.authService.logout()
  }
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
}

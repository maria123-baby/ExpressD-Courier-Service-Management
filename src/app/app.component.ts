import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthService } from './auth.service';
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
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
}

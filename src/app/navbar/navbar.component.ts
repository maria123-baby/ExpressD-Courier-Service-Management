import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  currentUserUid: string | null = null;
  afAuth=inject(AngularFireAuth);
userID:string|null="xWry0eAtQGXt7U3quQXUBWpIMf22";
  constructor(private router:Router){
    
  }
  ngOnInit(): void {
  this.afAuth.authState.subscribe((user:any) => {
    if (user) {
      // User is logged in, retrieve UID
      this.currentUserUid = user.uid;
    } else {
      // User is not logged in, UID is null
      this.currentUserUid = null;
    }
  });
}
onLogout(): void {
  console.log('hello');
  this.afAuth.signOut().then(() => {
    // Remove the user token from local storage
    console.log('hello');
    localStorage.removeItem('users');
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }).catch(error => {
    // Handle logout error
    //console.error('Logout error:', error);
  });
}
}

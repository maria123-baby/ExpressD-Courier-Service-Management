import { Injectable } from '@angular/core';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const userToken = localStorage.getItem('users');
      if (userToken) {
        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            if (this.router.url === '/dashboard') {
              // The current path is /dashboard
              if (userToken === "X7WBCBXa1iNT834yh7ON5ut9g972" || "xWry0eAtQGXt7U3quQXUBWpIMf22") {
                observer.next(true);
              } else {
                this.router.navigateByUrl('/login');
                observer.next(false);
              }
            }
          }
        });
        observer.next(true);
      } else {
        // User is not logged in, redirect to login page
        this.router.navigateByUrl('/login');
        observer.next(false);
      }
    });
  }
}
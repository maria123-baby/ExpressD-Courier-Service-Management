<<<<<<< HEAD
import { Injectable, OnInit} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
=======
import { Injectable, inject, signal} from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./user.interface";
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3

@Injectable({
    providedIn:'root'
})
<<<<<<< HEAD
export class AuthService implements OnInit{

isAuthenticated:boolean=false;
constructor(private auth:AngularFireAuth){}
   ngOnInit(): void {
       this.auth.authState.subscribe(user=>{
        this.isAuthenticated=!!user;
       });
   }

 }
    
=======
export class AuthService{
    firebaseAuth = inject(Auth);
    user$ = user(this.firebaseAuth);
    currentUserSig = signal<UserInterface | null | undefined>(undefined)
    register(email:string,username:string,password:string):Observable<void>{
        const promise = createUserWithEmailAndPassword(this.firebaseAuth,
            email,
            password,
        ).then(response => updateProfile(response.user,{displayName:username}))
        return from(promise);
    }
    login(email:string,password:string):Observable<void>{
        const promise = signInWithEmailAndPassword(this.firebaseAuth,
            email,
            password,
        ).then(()=>{});
        return from(promise);
    }
    logout():Observable<void>{
        const promise =signOut(this.firebaseAuth);
        return from(promise);
    }
}
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3

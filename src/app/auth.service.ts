<<<<<<< HEAD
import { Injectable, OnInit} from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Injectable, inject, signal} from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signOut, user } from "@angular/fire/auth";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Observable, from } from "rxjs";
import { UserInterface } from "./user.interface";

@Injectable({
    providedIn:'root'
})
export class AuthService implements OnInit{

isAuthenticated:boolean=false;
constructor(private auth:AngularFireAuth){}
   ngOnInit(): void {
       this.auth.authState.subscribe(user=>{
        this.isAuthenticated=!!user;
       });
   }

 }
    


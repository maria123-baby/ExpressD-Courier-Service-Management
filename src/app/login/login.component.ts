import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgClass,RouterLink,ReactiveFormsModule],
  providers:[AngularFireAuth],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form2!:FormGroup;
 fb=inject(FormBuilder);
  router=inject(Router);
  auth=inject(AngularFireAuth);
ngOnInit(): void {

 
  this.form2=this.fb.nonNullable.group({
    email:['',Validators.required],
    password:['',Validators.required],
  });
}

 
  onlogin(){
    const { email, password } = this.form2.value;
    this.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            //console.log('hello', response.user?.uid);
            let user = response.user?.uid;
            if (user) {
                localStorage.setItem('users', user);
                this.router.navigateByUrl('/userdetails');
            } else {
                // Handle the case where user is undefined
            }
        })
     .catch(error=>{
     })  ;
  }
  
}
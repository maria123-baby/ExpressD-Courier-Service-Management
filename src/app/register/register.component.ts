import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
    imports: [RouterOutlet,NgClass,RouterLink,ReactiveFormsModule],
  templateUrl:'./register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {




  form1!:FormGroup;

 fb=inject(FormBuilder);
  http=inject(HttpClient);
  router=inject(Router);
  auth=inject(AngularFireAuth);
ngOnInit(): void {

  this.form1=this.fb.nonNullable.group({
    email:['',Validators.required],
    username:['',Validators.required],
    password:['',Validators.required],
  });
  
}

  onSignup(){
    const {email,username,password}= this.form1.value;
     this.auth.createUserWithEmailAndPassword(email,password).then(response=>{
       alert('Registered Successfully');
         this.router.navigateByUrl('/login');
     })
      .catch(error=>{

      })  ;
  }

}
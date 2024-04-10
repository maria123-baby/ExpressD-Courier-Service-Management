import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
<<<<<<< HEAD
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
=======
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgClass,RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
<<<<<<< HEAD
export class LoginComponent implements OnInit{
  form1!:FormGroup;
  form2!:FormGroup;
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
  this.form2=this.fb.nonNullable.group({
    email:['',Validators.required],
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
  onlogin(){
    const {email,password}= this.form2.value;
    this.auth.signInWithEmailAndPassword(email,password).then(response=>{
        this.router.navigateByUrl('/userdetails');
    })
     .catch(error=>{
     })  ;
  }
=======
export class LoginComponent {
  tform!:FormGroup;
  constructor(private fb: FormBuilder,private http:HttpClient,private router: Router,private authService:AuthService){
  this.tform=this.fb.nonNullable.group({
    username:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
  });}
  onSignup():void{
    const rawForm=this.tform.getRawValue();
    this.authService.register(rawForm.email,rawForm.username,rawForm.password)
    .subscribe(()=>{
      alert('Registered Successfully');
      this.router.navigate(['/login']);
    })
  }
  onlogin():void{
    const rawForm=this.tform.getRawValue();
    this.authService.login(rawForm.email,rawForm.password)
    .subscribe({
      next:()=>{
      this.router.navigate(['/userdetails']);
    }
  });
  }

>>>>>>> 79c2a90a4eb9af1f66b697caa03ea4a27f9cf4b3
}

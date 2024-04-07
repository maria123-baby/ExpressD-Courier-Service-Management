import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet,FormsModule,NgClass,RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
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

}

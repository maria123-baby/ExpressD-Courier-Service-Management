import { Component, OnInit } from '@angular/core';
import { IUser } from '../core/models/common.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userdetails',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule,RouterOutlet],
  templateUrl: './userdetails.component.html',
  styleUrl: './userdetails.component.css'
})
export class UserdetailsComponent implements OnInit{
  users: IUser[]=[];
userForm!: FormGroup;

constructor(private fb: FormBuilder,private userServices: UserService,private router: Router,private activatedRoute:ActivatedRoute){
  this.userForm = this.fb.group({
    package_id:this.generateGUID(),
    sender_name: new FormControl('',),
    sender_address: new FormControl('',),
    pincode_sender: new FormControl('',),
    sender_email: new FormControl('',),
    sender_contact: new FormControl('',),
    receiver_name: new FormControl('',),
    receiver_address: new FormControl('',),
    pincode_receiver: new FormControl('',),
    receiver_email: new FormControl('',),
  });
}
 
ngOnInit(): void {
  throw new Error('Method not implemented.');
}
onSubmit(){
  //if(this.userForm.valid){
    console.log(4)
      this.userServices.addDetail(this.userForm.value);
      
    
    //this.router.navigate(['/admin']);
 // }else{
    //console.log(2)
    //this.userForm.markAllAsTouched();
  //}
}
generateGUID():string {
  const timestamp = new Date().getTime();
  const randnum=Math.floor(Math.random()*10);
  return `PI${timestamp}${randnum}`;
}

isAdmin(){
  /*let status = localStorage.getItem('adminStatus')
  return true*/
  status:Boolean
  let username=localStorage.getItem('loggedUser');
  let status=username?.includes("maria-123-baby") && ("Maria@123");
  return status
}

}

import { Component, OnInit, inject } from '@angular/core';
import { IUser } from '../core/models/common.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UserService } from '../core/services/user.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
    selector: 'app-userdetails',
    standalone: true,
    templateUrl: './userdetails.component.html',
    styleUrl: './userdetails.component.css',
    imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent]
})
export class UserdetailsComponent implements OnInit{
  
 users: IUser[]=[];
 orderId: string | undefined;
 showField: boolean = false;
userForm!: FormGroup;
currentUserUid: string | null = null;
userID:string|null="X7WBCBXa1iNT834yh7ON5ut9g972";
dataToSend: any;
constructor(private fb: FormBuilder,private userServices: UserService,private router: Router,private afAuth: AngularFireAuth){
  let uid=localStorage.getItem('users');
  this.orderId = this.generateorderID();
  this.userForm = this.fb.group({
    package_id:this.generateGUID(),
    order_id:this.orderId,
    sender_name: new FormControl('',),
    sender_address: new FormControl('',),
    pincode_sender: new FormControl('',),
    sender_email: new FormControl('',),
    receiver_name: new FormControl('',),
    receiver_address: new FormControl('',),
    pincode_receiver: new FormControl('',),
    receiver_email: new FormControl('',),
    user_uid:uid,
    payment:false,
    trackdetails:{
      Booked:false,
      Pickup:false,
      Reached_Destination:false,
      In_Transit:false,
      Out_for_Delivery:false,
      Delivered:false
    },
  });
}
openModel(){
  const modelDiv=document.getElementById('myModal');
  if(modelDiv!=null){
   modelDiv.style.display='block';
  }

}
CloseModel(){
 const modelDiv=document.getElementById('myModal');
 if(modelDiv!=null){
  
  modelDiv.style.display='none';
  }
 
  this.router.navigate(['/payment']);
}
ngOnInit(): void {
 // throw new Error('Method not implemented.');
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
toggleField() {
  
    this.showField = !this.showField;
  
}

onSubmit(){
  //if(this.userForm.valid){
    //console.log(4)
      this.userServices.addDetail(this.userForm.value);
      

      //this.router.navigate(['/orderdetails']);
      
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
generateorderID():string {
  const timestamp = new Date().getTime();
  const randnum=Math.floor(Math.random()*10);
  const dataToSend= `OI${timestamp}${randnum}`;

  return dataToSend;
}


}
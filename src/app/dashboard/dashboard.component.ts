import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IUser } from '../core/models/common.model';
import { UserService } from '../core/services/user.service';
import { firebaseConfig } from '../core/constants/constants';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[RouterModule,RouterLink,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
  
  details: IUser[]=[];
  totalExpenses=0;
selectedValue: string='';
  constructor(private userService:UserService, private router:Router,private db:AngularFireDatabase){
    firebase.initializeApp(firebaseConfig);
    
   
  }
 
  updateUserdata(selectedvalue:string):void{
    const field='status';
    const currentUser=firebase.auth().currentUser;
    if(currentUser){
      const uid=currentUser.uid;
      console.log(uid);
     this.updatestatusfield(uid,field,selectedvalue);
    
    }
    
    
    
  } 
  updatestatusfield(uid:string,status:string,selectedValue:string):Promise<void>{
  
    console.log(selectedValue);
    const userref=this.db.object(`userdetails/user_id/${uid}`);
    return userref.update({[status]:selectedValue})
  }
  ngOnInit(): void {
    this. getAllDetails();
  }
  getAllDetails(){
    this.userService. getAllDetails().snapshotChanges().subscribe({
      next: (data)=>{
        this.details=[];
        data.forEach((item)=>{
          let detail= item.payload.toJSON() as IUser;
          this.details.push({
            key: item.key || '',
            package_id:detail.package_id,
            order_id:detail.order_id,
            sender_name: detail.sender_name,
            sender_address: detail.sender_address,
            pincode_sender: detail.pincode_sender,
            sender_email: detail.sender_email,
            sender_contact: detail.sender_contact,
            receiver_name: detail.receiver_name,
            receiver_address: detail.receiver_address,
            pincode_receiver: detail.pincode_receiver,
            receiver_email: detail.receiver_email,
            trackdetails:detail.trackdetails,
          })
        }) 
      },
    });
  }
  removeExpense(key:string){
    if(window.confirm('Are you sure to remove?')){
      this.userService.deleteExpense(key);
    }
}

}
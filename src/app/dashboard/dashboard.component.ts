import { Component, OnInit } from '@angular/core';
import {  RouterLink, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../core/models/common.model';
import { UserService } from '../core/services/user.service';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormsModule} from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [RouterModule,RouterLink, FormsModule, CommonModule, NavbarComponent],
    providers:[UserService],
})


export class DashboardComponent implements OnInit{

  details: IUser[]=[];
  totalExpenses=0;
  selectedValues: string[] = [];
selectedItem: string|null=null;

  constructor(private userService:UserService,private db:AngularFireDatabase){ 
  }
  editExpense(key:string){
    console.log(key);
    //this.router.navigate(['/expense-form/' + key]);
   
  }
  onDropdownChange(event: Event,key:string,selectedValue:string):void {
    // Get the selected value
    const selectedvalue = (event.target as HTMLSelectElement).value;
    
    // Perform actions based on the selected value
    console.log('Selected value:', selectedValue,key);
    
    const currentUser=firebase.auth().currentUser;
    if(currentUser){
      const uid=currentUser.uid;
      
     this.updatestatusfield(key,selectedValue);
    }
  
    // You can call other methods or update component properties here
  }
 
 
  updatestatusfield(key:string,selectedValue:string):Promise<void>{
    return this.db.object(`userdetails/${key}/trackdetails`).update({ [selectedValue]: true });
    
    
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
            sender_contactno: detail.sender_contactno,
            receiver_name: detail.receiver_name,
            receiver_address: detail.receiver_address,
            pincode_receiver: detail.pincode_receiver,
            receiver_email: detail.receiver_email,
            receiver_contactno:detail.receiver_contactno,
            payment:detail.payment,
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
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { NavbarComponent } from "../navbar/navbar.component";
import { PaymentService } from '../payment.service';
interface Order {
  orderId: string;
  senderName: string;
  receiverName: string;
  senderAddress:string;
  senderPincode:string;
  senderEmail:string;
  receiverAddress:string;
  receiverPincode:string;
  receiverEmail:string;
  payment:boolean;
  // Add other properties as needed
}

@Component({
    selector: 'app-orderdetails',
    standalone: true,
    templateUrl: './orderdetails.component.html',
    styleUrl: './orderdetails.component.css',
    imports: [RouterModule, CommonModule, NavbarComponent]
})
export class OrderdetailsComponent implements OnInit{
  currentUserUid: string | null = null;
  orders: Order[] = [];
  afAuth=inject(AngularFireAuth)
  dataFound: boolean=true;
  constructor(private db:AngularFireDatabase,private paymentService:PaymentService){}
 ngOnInit(): void {
  this.afAuth.authState.subscribe((user:any) => {
    if (user) {
      // User is logged in, retrieve UID
      this.currentUserUid = user.uid;
    } else {
      // User is not logged in, UID is null
      this.currentUserUid = null;
    }
    console.log(this.currentUserUid);
    this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
      this.orders = [];
      snaps.forEach(snap => {
        const key = snap.key;
        const data: any = snap.payload.val();
        if (data.user_uid === this.currentUserUid) {
          console.log(key);
          const order: Order = {
            orderId: data.order_id,
            senderName: data.sender_name,
            receiverName: data.receiver_name,
            senderAddress:data.sender_address,
            senderPincode:data.pincode_sender,
            senderEmail:data.sender_email,
            receiverAddress:data.receiver_address,
            receiverPincode:data.pincode_receiver,
            receiverEmail:data.receiver_email,
            payment:data.payment,
            // Add other properties as needed
          };
          this.orders.push(order);
        }
          // Order found, update step completion status
        

          })
          if(this.orders.length===0){
            this.dataFound=false;
            this.paymentService.setnobooked(false);
          }
          //console.log(data.order_id);
    
          });
          
        
      });
  }
  
 }

  
import { Component, OnInit} from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { IUser } from '../core/models/common.model';
import { CommonModule } from '@angular/common';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { NavbarComponent } from "../navbar/navbar.component";
import { PaymentService } from '../payment.service';
export interface Step {
  label: string;
  completed: boolean;
}
@Component({
    selector: 'app-track',
    standalone: true,
    templateUrl: './track.component.html',
    styleUrl: './track.component.css',
    providers: [
        {
            provide: STEPPER_GLOBAL_OPTIONS,
            useValue: {
                displayDefaultIndicatorType: false
            }
        }
    ],
    imports: [MatStepperModule, MatIconModule, CommonModule, NavbarComponent]
})

export class TrackComponent implements OnInit{
  isOrderTrackingStarted = false;
  isValidOrderId=true;
  showMessage=false;
  sender=''|| null;
  booked:boolean=true;
  receiver='' || null;
  [x: string]: any;
  details: IUser[]=[];
  
  constructor(private db:AngularFireDatabase,private paymentService: PaymentService){ 
  }
  steps: Step[] = [
    

    { label: 'Booked', completed: false },
    { label: 'Pickup', completed: false },
    { label: 'In_Transit', completed: false },
    { label: 'Reached_Destination', completed: false },
    { label: 'Out_for_Delivery', completed: false },
    { label: 'Delivered', completed: false }
  ];

ngOnInit(): void {

}
  trackOrder(orderNum:string):void {
  
    setTimeout(() => {
      this.showMessage = true;
    }, 500); 
   this.isValidOrderId=false;

    this.steps.forEach(step => step.completed = false);

  
    // Fetch order details from Firebase
   this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
    snaps.forEach(snap => {
        const key = snap.key;
        const data: any = snap.payload.val();
        
        if (data.order_id === orderNum && data.payment) {
          
            this.isValidOrderId = true;
         
          this.sender=data.sender_name;
          this.receiver=data.receiver_name;
          // Order found, update step completion status
          this.steps.forEach(step => {
            if (data.trackdetails && data.trackdetails[step.label]) {
              //console.log(data.trackdetails[step.label]);
              step.completed = true;
              
            }
           
          
          });
        
        }
        else if(data.order_id === orderNum && data.payment===false)
          {
            this.booked=false
          }
      });
    
    });
    if (!this.booked) {
      this.isValidOrderId = false;
      this.sender = null;
      this.receiver = null;
      this.steps.forEach(step => {
        step.completed = false;
      });
    }
    
    this.isOrderTrackingStarted = true;
  }
  }
import { Component, NgModule, ViewChild } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UserService } from '../core/services/user.service';
import { Router } from '@angular/router';
import { IUser } from '../core/models/common.model';
import { Observable, forkJoin, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { NavbarComponent } from "../navbar/navbar.component";
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

export class TrackComponent {
  isOrderTrackingStarted = false;
  isValidOrderId=true;
  showMessage=false;
  sender='';
  receiver='';
  [x: string]: any;
  details: IUser[]=[];
  
  constructor(private userService:UserService, private router:Router,private db:AngularFireDatabase){ 
  }
  steps: Step[] = [
    

    { label: 'Booked', completed: false },
    { label: 'Pickup', completed: false },
    { label: 'In_Transit', completed: false },
    { label: 'Reached_Destination', completed: false },
    { label: 'Out_for_Delivery', completed: false },
    { label: 'Delivered', completed: false }
  ];
 
  trackOrder(orderNum:string):void {
    setTimeout(() => {
      this.showMessage = true;
    }, 3000); 
   this.isValidOrderId=false;
  
    this.steps.forEach(step => step.completed = false);

  
    // Fetch order details from Firebase
   this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
      snaps.forEach(snap => {
        const key = snap.key;
        const data: any = snap.payload.val();
          this.isOrderTrackingStarted = true;
        
        if (data.order_id === orderNum) {
          console.log(key);
          console.log(data.order_id);
          
            this.isValidOrderId = true;
         
          this.sender=data.sender_name;
          this.receiver=data.receiver_name;
          // Order found, update step completion status
          this.steps.forEach(step => {
            if (data.trackdetails && data.trackdetails[step.label]) {
              //console.log(data.trackdetails[step.label]);
              console.log(step);
              step.completed = true;
              
            }
           
          
          });
        }
       
      });
     
    });
    
    
    
  }
  }
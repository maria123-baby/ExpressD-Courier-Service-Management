import { Component, OnInit, inject } from '@angular/core';
import { firebaseConfig } from '../core/constants/constants';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})

export class TrackingComponent implements OnInit{
  constructor(){
  firebase.initializeApp(firebaseConfig);}
  go(pid: string) {
      const database = firebase.database();
     const pack_id = pid;
    let userId :string;
     const usersref = database.ref('users');
     usersref.orderByChild('package_id').equalTo(pid).once('value')
     .then((snapshot)=>{
      if(snapshot.exists()){
        snapshot.forEach((childSnapshot)=>{
           userId = childSnapshot.key;
        });

      }
     });  
      
    }
   
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
    
  }





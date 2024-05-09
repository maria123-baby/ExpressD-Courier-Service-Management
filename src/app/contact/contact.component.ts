import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  feedback = {
    name: '',
    email: '',
    message: ''
  };

  //constructor(private db: AngularFireDatabase) {}

 /* submitFeedback() {
    this.db.list('/feedback').push(this.feedback)
      .then(() => {
        alert('Feedback sent successfully!');
        this.feedback = {
          name: '',
          email: '',
          message: ''
        };
      })
      .catch((error: any) => {
        console.error('Error sending feedback:', error);
        alert('Failed to send feedback. Please try again later.');
      });
  }*/
}
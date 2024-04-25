import { Component } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
export interface Step {
  label: string;
  completed: boolean;
}
@Component({
  selector: 'app-track',
  standalone: true,
  imports: [MatStepperModule,MatIconModule],
  templateUrl: './track.component.html',
  styleUrl: './track.component.css'
})

export class TrackComponent {
  steps: Step[] = [
    
    { label: 'Booked', completed: false },
    { label: 'Pickup', completed: false },
    { label: 'In Transit', completed: false },
    { label: 'Reached Destination', completed: false },
    { label: 'Out for Delivery', completed: false },
    { label: 'Delivery', completed: false }
  ];

orderNum: any;

  trackOrder(orderNum:string): void {
    let stepIndex = 0;
    const interval = setInterval(() => {
      this.steps[stepIndex].completed = true;
      stepIndex++;
      if (stepIndex === this.steps.length) {
        clearInterval(interval);
      }
    }, 1000);
}
markStepCompleted(stepIndex: number): void {
  this.steps[stepIndex].completed = true;
}
}

 
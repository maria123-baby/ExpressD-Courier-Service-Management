import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentDone = new BehaviorSubject<boolean>(false);

  setnobooked(value: boolean) {
    this.paymentDone.next(value);
  }

  getPaymentDone() {
    return this.paymentDone.asObservable();
  }
}

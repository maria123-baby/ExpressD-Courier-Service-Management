import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CheckoutService } from '../core/services/checkout.service';

interface Order {
  orderId: string;
  senderName: string;
  receiverName: string;
  paymentStatus?: boolean; // Track payment status
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [HttpClientModule], 
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  orders: Order[] = []; // List of orders
  paymentHandler: any; 
  currentUserUid: string | null = null;

  constructor(
    private checkout: CheckoutService,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {}

  ngOnInit() {
    this.invokeStripe(); 
    this.loadOrders();  // Load orders from Firebase
  }

  loadOrders() {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        this.currentUserUid = user.uid; 
        this.db
          .list('userdetails', (ref) => ref.orderByChild('user_uid').equalTo(this.currentUserUid))
          .snapshotChanges()
          .subscribe((snaps) => {
            this.orders = snaps.map((snap) => {
              const data: any = snap.payload.val(); 
              const orderId = data?.order_id ?? '';
              const senderName = data?.sender_name ?? '';
              const receiverName = data?.receiver_name ?? '';
              const paymentStatus= data?.payment ?? false;
              return {
                orderId,
                senderName,
                receiverName,
                paymentStatus, 
              };
            });
          });
      }
    });
  }

  makePayment(order: Order) {
    order.paymentStatus = false; // Mark as paid
    const paymentHandler = (window as any).StripeCheckout.configure({
      key: 'pk_test_51P2vkoSAEiT15doWH3CqEmQ90JSv0gVIJAD4VYPRu70q4zSmM1rqR9bQkbxDtUvv0LrjSmCpGw684uG9q45AoOMD00ki5lysRn', 
      locale: 'auto',
      token: (stripeToken: any) => {
        this.db.list('userdetails').snapshotChanges().subscribe(snaps => {
          snaps.forEach(snap => {
            const key = snap.key;
            const data: any = snap.payload.val();
            
           if (data.user_uid === this.currentUserUid && data.order_id===order.orderId) {
                console.log('id',order.orderId);
                 console.log('key',key);
                 console.log(data.payment);
                 this.db.object(`userdetails/${key}`).update({ ['payment']: true });
                 
                 order.paymentStatus=data.payment;
              }
          })
        })
        this.checkout.makePayment(stripeToken).subscribe((data) => {
          console.log('Payment Successful:', data);
          this.removeOrder(order); // Optionally remove the order after payment
        });
      },
    });

    paymentHandler.open({
      name: 'ExpressD',
      description: 'Parcel Delivery',
      amount: 1000, // Stripe requires the amount in cents
    });
  }

  removeOrder(order: Order) {
    this.db.list('userdetails').remove(order.orderId).then(() => {
      this.orders = this.orders.filter((o) => o.orderId !== order.orderId);
      console.log(`Order ${order.orderId} removed successfully.`);
    });
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (window as any).StripeCheckout.configure({
          key: 'pk_test_51P2vkoSAEiT15doWH3CqEmQ90JSv0gVIJAD4VYPRu70q4zSmM1rqR9bQkbxDtUvv0LrjSmCpGw684uG9q45AoOMD00ki5lysRn', 
          locale: 'auto',
          token: (stripeToken: any) => {
            console.log('Stripe Token:', stripeToken);
          },
        });
      };
      window.document.body.appendChild(script); // Append script to the DOM
    }
  }
}

export interface UserInterface{
    email:string;
    username:string;
}
export interface OrderData {
    booked: boolean;
    Pickup: boolean;
    InTransit: boolean;
    ReachedDestination: boolean;
    Outfordelivery: boolean;
    Delivered: boolean;
  }
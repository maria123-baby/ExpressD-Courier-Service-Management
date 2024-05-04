export interface IUser{
    key?: string;
    package_id:string;
    order_id:string;
    sender_name: string;
    sender_address: string;
    pincode_sender:string;
    sender_email:string;
    sender_contact: string;
    receiver_name: string;
    receiver_address: string;
    pincode_receiver: string;
    receiver_email:string;
    payment:boolean;
    trackdetails:Array<{ Booked:boolean,
      Pickup:boolean,
      In_Transit:boolean,
      Reached_Destination:boolean,
      Out_for_Delivery:boolean,
      Delivered:boolean}>;
}
export interface UserData {
    key?: string;
    email: string;
    role: Roles;
    username:string;
  }
  export interface Roles{
    admin?:boolean;
    user?:boolean;
  }

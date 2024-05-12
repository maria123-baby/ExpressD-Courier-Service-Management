import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { IUser } from '../models/common.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:4200/userdetails';

  
  private dbPath ="/userdetails";
  userRef: AngularFireList<any>;
  constructor(private db: AngularFireDatabase,private http: HttpClient) {
    this.userRef = db.list(this.dbPath);
    
   }
   getAllDetails(){
    return this.userRef;
   }
   getDetail(key:string){
    return this.db.object(`${this.dbPath}/${key}`);
   }
   addDetail(user: IUser){
    this.userRef.push(user);
    return this.http.post(this.apiUrl, user);
   }
   deleteExpense(key: string){
    return this.userRef.remove(key);
    }
    
  


}

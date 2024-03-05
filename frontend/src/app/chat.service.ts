import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Socket } from 'ngx-socket-io';
// import { io,Socket} from 'socket.io-client';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

   constructor(private http:HttpClient,private socket: Socket) { }

   
  

  getdata():Observable<any>{

 return this.http.get("http://localhost:3001/users/new")
  }

  submit(values:any){
    console.log(values)
    return this.http.post("http://localhost:3001/users/signup",values)
  }

  checkuname(value:any){
    console.log(value);
   let body={uname:value}
    return this.http.post("http://localhost:3001/users/checkuname",body)
  }

  loginSubmit(values:any){
    console.log(values);
    let body1={uname:values.uname,pwd:values.pwd}
    return this.http.post("http://localhost:3001/users/loginSubmit",body1)
  }

//==================
public login(username: string): void {
  this.socket.emit('login', username);
}
public sendMessage(sender:any,content:any): void {
  this.socket.emit('message', {sender,content});
}

public getMessage(): Observable<any> {
  return new Observable<any>((observer) => {
    this.socket.on('message', (data: any) => {
      observer.next(data);
    });
  });
}

 details():Observable<any>{
  console.log("hi")
  return this.http.get("http://localhost:3001/details")

}

}




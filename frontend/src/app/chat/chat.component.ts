import { Component } from '@angular/core';
import { OnInit,AfterViewInit } from '@angular/core';
import { AfterViewChecked } from '@angular/core';
import { ChatService } from '../chat.service';
import {Router } from '@angular/router';
 import { Socket } from 'ngx-socket-io';
// import { io,Socket} from 'socket.io-client';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
 
  uname:any;
  newMessage: string = '';
  typingUser: string[] = [];
  username: string = '';
  message: string = '';
  loggedIn: boolean = false;
  messages: any[] = [];
  userslist:any;
   constructor(private socket: Socket,private chatService:ChatService,private router:Router){ 
    
   this.uname=  this.router.getCurrentNavigation()?.extras.state?.['uname']
  
   this.socket.on('new-user', () => {
    console.log("new user")
    this.chatService.details().subscribe(res=>{this.userslist=Object.values(res);console.log(this.userslist)});
  
  });
    }
ngOnInit(): void {
 
 
   this.chatService.login(this.uname);
   

    // Listen for chat history event
    this.socket.on('chat-history', (messages: any[]) => {
      this.messages = messages;
      console.log(messages);
      

    });

    this.chatService.getMessage().subscribe((data) => {
      this.messages.push(data);
      
    });

  this.socket.on('typing', (user: string) => {
      if (!this.typingUser.includes(user)) {
        this.typingUser.push(user);
      }
    });

    this.socket.on('stopTyping', (user: string) => {
      this.typingUser = this.typingUser.filter(u => u !== user);
      console.log(this.typingUser)
    });
   
}

  

 sendMessage(): void {
    this.chatService.sendMessage(this.uname, this.message);
    this.message = '';
    this.sendStopTypingEvent()
  }

   sendTypingEvent() {
    this.socket.emit('typing');
    console.log("typing")
  }

  sendStopTypingEvent() {
    this.socket.emit('stopTyping');
    console.log("stop")
  }

//   delete(){
//     // this.messages=[];
// this.socket.emit('deletereq');
//   }
}

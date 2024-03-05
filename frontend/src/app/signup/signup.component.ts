import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],

})
export class SignupComponent implements OnInit {

constructor(private ChatService:ChatService,private fb:FormBuilder,private router: Router){}
ipsignup:any;
checkedvalue:any;

signup=this.fb.group({
  uname:["",Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(8)])],
  email:["",Validators.compose([Validators.required,Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/)])],
  pwd:["",Validators.compose([Validators.required,Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{5,10}/)])],

})

  ngOnInit(): void {
    // this.ChatService.getdata().subscribe({
    //   next:(res=>console.log(res)),
    //   error:(err=>console.log(err)),
    //   complete:(()=>console.log("completed"))
    // })
  }

  onSubmit(values:any){
    console.log(values);
    if(this.checkedvalue=="not"){
    this.ChatService.submit(values).subscribe({
      next:(res=>{if(res=="user created"){alert("user created");this.router.navigate(["/login"])}}),
      error:(err=>console.log(err)),
      // complete:(()=>console.log("completed"))
    })
  }
  else{
    alert("username already exists")
  }
  }

  checkUname(event:any){
  console.log(event.target.value)
  this.ChatService.checkuname(event.target.value).subscribe({
    next:(res=>{this.checkedvalue=res;console.log(res)}),
    error:(err=>console.log(err)),
    // complete:(()=>console.log("username checked"))
  })
  }
}
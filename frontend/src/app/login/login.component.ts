import { Component } from '@angular/core';
import { ChatService } from '../chat.service';
import {FormBuilder,FormGroup,FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private ChatService:ChatService,private fb:FormBuilder,private router: Router){}

  loginmsg:any;
  iplogin:any;
  login=this.fb.group({
    uname:["",Validators.compose([Validators.required])],
    pwd:["",Validators.compose([Validators.required])],
  
  })

  onSubmit(value:any){
    console.log(value)
    this.ChatService.loginSubmit(value).subscribe({
      next:(res=>{this.loginmsg=res;if(res=="Authorized user"){this.router.navigate(['/chat'], { state: { uname: value.uname } }); }}),
      error:(err=>console.log(err)),
      complete:(()=>console.log("login"))
    })
  }

}

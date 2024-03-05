import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() iplogin:boolean=false;
  @Input() ipsignup:boolean=false;
  @Input() logout:boolean=false;
  @Input() uname:string='';
@Input() chat:boolean=false;

  constructor(){
    console.log(this.iplogin)
  }
}


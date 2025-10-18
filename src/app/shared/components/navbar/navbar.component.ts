import { AuthService, UserData } from './../../../core/services/auth.service';
import { Component } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLogin = false;

  pages: {title: string, path: string}[] = [
    {title: 'Home', path: 'home'},
    {title: 'Products', path: 'products'},
    {title: 'Categories', path: 'categories'},
    {title: 'Brands', path: 'brands'},
    {title: 'Cart', path: 'cart'},
  ]

   authPages: {title: string, path: string}[] = [
    {title: 'Login', path: 'login'},
    {title: 'Register', path: 'register'},
   ]

 constructor(private flowbiteService: FlowbiteService, private authService: AuthService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

    this.authService.userDataDecoded.subscribe({
      next: (user)=>{
        console.log(user, "navbar");
        if(user !== null){
          this.isLogin = true;
        }else{
          this.isLogin = false;
        }
      }
    })
  }

  logOut(){
    this.authService.logOut();
  }
}

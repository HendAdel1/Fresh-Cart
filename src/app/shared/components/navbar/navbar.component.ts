import { AuthService, UserData } from './../../../core/services/auth.service';
import { Component, inject } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink } from "@angular/router";
import { RouterLinkActive } from "@angular/router";
import { LangService } from '../../../core/services/lang.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  langService = inject(LangService);

  isLogin = false;

  pages: {title: string, path: string}[] = [
    {title: 'navbar.home', path: 'home'},
    {title: 'navbar.products', path: 'products'},
    {title: 'navbar.categories', path: 'categories'},
    {title: 'navbar.brands', path: 'brands'},
  ]

   authPages: {title: string, path: string}[] = [
    {title: 'navbar.login', path: 'login'},
    {title: 'navbar.register', path: 'register'},
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

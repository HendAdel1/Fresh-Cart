import { CookieService } from 'ngx-cookie-service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LangService {

  constructor( private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: string, private cookieService: CookieService){
      
    this.translate.addLangs(['ar', 'en']);
    const lang = cookieService.get('lang');
    this.translate.use(lang  || 'en');

    if(isPlatformBrowser(platformId)){
    this.changeDirection(lang  || 'en');

    }
  }

  changeLang(lang: string){
    this.translate.use(lang);
    this.cookieService.set('lang', lang);
    this.changeDirection(lang);

  }

  changeDirection(lang: string) {
    const direction = lang == "ar" ? "rtl" : "ltr";
    document.querySelector('html')!.dir = direction;
  }
}

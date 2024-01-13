import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayouttComponent implements OnInit {
  lang: any;
  constructor(private translate: TranslateService , private router:Router) {

    this.lang = translate.currentLang;
  }

  ngOnInit(): void {}
  changeLang() {
    if (this.lang == 'en') {
      localStorage.setItem('language', 'ar');
    } else {
      localStorage.setItem('language', 'en');
    }
    window.location.reload();
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login'])
  }
}

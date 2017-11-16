import { Component, ViewChild, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, Platform, Content } from 'ionic-angular';
import { finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Logger } from '../core/logger.service';
import { I18nService } from '../core/i18n.service';

const log = new Logger('Blog');

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @ViewChild(Content) content:Content;
  private version: string = environment.version;
  private error: string = null;
  private navIsFixed: boolean = false;

  constructor(private router: Router,
              private platform: Platform,
              private loadingController: LoadingController,
              private i18nService: I18nService,
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.content.ionScroll
    .subscribe((data:any) => {
      let scrollTop:number = data['scrollTop'];
      if (scrollTop > 100) {
        this.navIsFixed = true;
      } else if (this.navIsFixed && scrollTop < 10) {
        this.navIsFixed = false;
      }
    });
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

}

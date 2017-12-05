import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
  public recipes: any[] = [];
  public tags:any[] = [];
  public authors:any[] = [];
  public author:any;

  constructor(private router: Router,
              private elRef:ElementRef,
              private platform: Platform,
              private loadingController: LoadingController,
              private i18nService: I18nService,
  ) {

    this.recipes = [
      {
        id:123451,
        img: "https://32lxcujgg9-flywheel.netdna-ssl.com/wp-content/uploads/2017/11/jerk-roasted-squash-3.jpg",
        title: "Jerk Roasted Kuri Squash with Bulgur Salad",
        site: {
          link: "https://naturallyella.com/jerk-roasted-kuri-squash/",
          name: "naturallyella.com"
        }
      },
      {
        id:123452,
        img: "https://32lxcujgg9-flywheel.netdna-ssl.com/wp-content/uploads/2017/11/bulgur-lentil-ragu-2.jpg",
        title: "Bulgur Lentil Ragu with Parsnip-Rutabaga Mash",
        site: {
          link: "https://naturallyella.com/jerk-roasted-kuri-squash/",
          name: "naturallyella.com"
        }
      },
      {
        id:123453,
        img: "https://32lxcujgg9-flywheel.netdna-ssl.com/wp-content/uploads/2017/11/butternut-squash-crepes-4.jpg",
        title: "Chipotle Butternut Squash Crepes with Cilantro Crema",
        site: {
          link: "https://naturallyella.com/jerk-roasted-kuri-squash/",
          name: "naturallyella.com"
        }
      },
      {
        id:123454,
        img: "https://32lxcujgg9-flywheel.netdna-ssl.com/wp-content/uploads/2017/11/pasta.jpg",
        title: "13 Vegetarian Pasta Recipes for Fall",
        site: {
          link: "https://naturallyella.com/jerk-roasted-kuri-squash/",
          name: "naturallyella.com"
        }
      }
    ];

    this.tags = [
      {
        hashtag: "breakfast",
        recipes: [...this.recipes]
      },
      {
        hashtag: "sugar-free",
        recipes: [...this.recipes]
      },
      {
        hashtag: "dairy-free",
        recipes: [...this.recipes]
      },
      {
        hashtag: "christmas",
        recipes: [...this.recipes]
      },
      {
        hashtag: "halloween",
        recipes: [...this.recipes]
      },
      {
        hashtag: "turkish",
        recipes: [...this.recipes]
      },
      {
        hashtag: "soaps",
        recipes: [...this.recipes]
      },
      {
        hashtag: "salads",
        recipes: [...this.recipes]
      },
      {
        hashtag: "meats",
        recipes: [...this.recipes]
      },
      {
        hashtag: "grill",
        recipes: [...this.recipes]
      },
      {
        hashtag: "rice",
        recipes: [...this.recipes]
      },
      {
        hashtag: "glutten-free",
        recipes: [...this.recipes]
      }
    ]

    this.author = {name: "Firat", surname: "Karadag", title: "Admin", image: "assets/images/author.jpg" };
    this.authors = [
      {
        id: 123451, name: "Firat", surname: "Karadag", title: "Admin", image: "assets/images/author.jpg",
        recipe: this.recipes[0]
      },
      {
        id: 123452, name: "Melda", surname: "Coskun", title: "Dietician", image: "assets/images/melda-coskun.jpg",
        recipe: this.recipes[1]
      },
      {
        id: 123453, name: "Yagmur", surname: "Ozkan", title: "Author", image: "assets/images/yagmur-ozkan.jpg",
        recipe: this.recipes[2]
      },
      {
        id: 123454, name: "Arzu", surname: "Uzer", title: "Author", image: "assets/images/arzu-uzer.jpg",
        recipe: this.recipes[3]
      }
    ];
    console.log("authors: ", this.authors);
  }

  ngOnInit() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  scrollTo(id:string) {
    let element = this.elRef.nativeElement.querySelector('#' + id);
    element.scrollIntoView();
  }

}

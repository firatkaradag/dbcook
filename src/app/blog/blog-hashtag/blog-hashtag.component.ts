import { Component, OnInit } from '@angular/core';
// import { NavParams } from 'ionic-angular';

@Component({
  selector: 'blog-hashtag',
  templateUrl: './blog-hashtag.component.html',
  styleUrls: ['./blog-hashtag.component.scss']
})

export class BlogHashtagComponent implements OnInit {

  public tag:any;
  public recipes: any[];

  constructor() {
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

    this.tag = {
      hashtag: "breakfast",
      recipes: [...this.recipes, ...this.recipes, ...this.recipes, ...this.recipes]
    }
  }

  ngOnInit() {

  }

}

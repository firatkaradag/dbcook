import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    BlogRoutingModule
  ],
  entryComponents: [
    BlogComponent
  ],
  declarations: [
    BlogComponent
  ]
})
export class BlogModule { }

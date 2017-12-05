import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogDetailRoutingModule } from './blog-detail/blog-detail-routing.module';
import { BlogHashtagRoutingModule } from './blog-hashtag/blog-hashtag-routing.module';
import { BlogAuthorRoutingModule } from './blog-author/blog-author-routing.module';
import { BlogComponent } from './blog.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogHeaderComponent } from './blog-header/blog-header.component';
import { BlogHashtagComponent } from './blog-hashtag/blog-hashtag.component';
import { BlogAuthorComponent } from './blog-author/blog-author.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    BlogRoutingModule,
    BlogDetailRoutingModule,
    BlogHashtagRoutingModule,
    BlogAuthorRoutingModule
  ],
  entryComponents: [
    BlogComponent,
    BlogDetailComponent,
    BlogHeaderComponent,
    BlogHashtagComponent,
    BlogAuthorComponent
  ],
  declarations: [
    BlogComponent,
    BlogDetailComponent,
    BlogHeaderComponent,
    BlogAuthorComponent,
    BlogHashtagComponent
  ]
})
export class BlogModule { }

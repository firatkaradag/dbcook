import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { Author } from './author-core/author.model';
import { AuthorService } from './author-core/author.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    AuthorRoutingModule
  ],
  entryComponents: [
    AuthorListComponent,
    AuthorDetailComponent
  ],
  declarations: [
    AuthorListComponent,
    AuthorDetailComponent
  ],
  providers: [
    AuthorService
  ]
})
export class AuthorModule { }

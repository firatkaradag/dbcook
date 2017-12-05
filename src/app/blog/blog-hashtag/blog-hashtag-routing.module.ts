import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../../core/i18n.service';
import { BlogHashtagComponent } from './blog-hashtag.component';

const routes: Routes = [
  { path: 'blog/tags/:id', component: BlogHashtagComponent, data: { title: extract('DBCook Hashtag') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlogHashtagRoutingModule { }

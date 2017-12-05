import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../../core/i18n.service';
import { BlogAuthorComponent } from './blog-author.component';

const routes: Routes = [
  { path: 'blog/authors/:id', component: BlogAuthorComponent, data: { title: extract('DBCook Author') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlogAuthorRoutingModule { }

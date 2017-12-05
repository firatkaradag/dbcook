import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../../core/i18n.service';
import { BlogDetailComponent } from './blog-detail.component';

const routes: Routes = [
  { path: 'blog/recipes/:id', component: BlogDetailComponent, data: { title: extract('DBCook Detail') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlogDetailRoutingModule { }

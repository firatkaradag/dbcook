import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  { path: 'blog', component: BlogComponent, data: { title: extract('DBCook') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class BlogRoutingModule { }

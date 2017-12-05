import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';

const routes: Routes = Route.withShell([
  { path: 'authors', component: AuthorListComponent, data: { title: extract('Author List') } },
  { path: 'authors/:id', component: AuthorDetailComponent, data: { title: extract('Author Detail') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AuthorRoutingModule { }

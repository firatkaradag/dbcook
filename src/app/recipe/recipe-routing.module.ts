import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeReviewComponent } from './recipe-review/recipe-review.component';

const routes: Routes = Route.withShell([
  { path: 'recipes', component: RecipeListComponent, data: { title: extract('Recipe List') } },
  { path: 'recipes/:id', component: RecipeDetailComponent, data: { title: extract('Recipe Detail') } },
  { path: 'recipe-view/:id', component: RecipeReviewComponent, data: { title: extract('Recipe Review') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class RecipeRoutingModule { }

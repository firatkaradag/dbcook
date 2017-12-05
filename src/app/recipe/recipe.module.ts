import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeReviewComponent } from './recipe-review/recipe-review.component';
import { Recipe } from './recipe-core/recipe.model';
import { RecipeService } from './recipe-core/recipe.service';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    RecipeRoutingModule
  ],
  entryComponents: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeReviewComponent
  ],
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeReviewComponent
  ],
  providers: [
    RecipeService
  ]
})
export class RecipeModule { }

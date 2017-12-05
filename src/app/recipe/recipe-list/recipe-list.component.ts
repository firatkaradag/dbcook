import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Recipe } from '../recipe-core/recipe.model';
import { RecipeService } from '../recipe-core/recipe.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  public recipes: Recipe[];
  public badges: string[] = [];
  public count: number = 0;
  public me: any;

  isLoading: boolean;

  constructor(
    private recipeService: RecipeService,
    private authenticationService: AuthenticationService
  ) {
    this.recipes = [];
    this.me = authenticationService.user;
  }

  ngOnInit() {
    this.isLoading = true;
    this.recipeService.getAll()
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((body:any) => {
        this.count = body.count;
        body.rows.forEach((row:any) => {
          let recipe = new Recipe(row);
          if (recipe.author === this.me.id) recipe.show = true;
          this.recipes = [...this.recipes, recipe];
          console.log("labels: ", recipe.labels);
        })
        // this.recipes = recipes ? recipes : [];
        console.log("recipes: ", this.recipes);
        console.log("rows: ", body.rows);
      });
  }

}

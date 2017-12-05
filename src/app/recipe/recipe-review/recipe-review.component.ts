import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { finalize } from 'rxjs/operators';

import { Recipe } from '../recipe-core/recipe.model';
import { RecipeService } from '../recipe-core/recipe.service';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-recipe-review',
  templateUrl: './recipe-review.component.html',
  styleUrls: ['./recipe-review.component.scss']
})
export class RecipeReviewComponent implements OnInit {

  private id: string;
  public recipe: Recipe;
  public content: SafeHtml;
  isLoading: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitized: DomSanitizer,
    private authenticationService:AuthenticationService
  ) {

    this.route.firstChild.firstChild.params
    .subscribe(params => {
      this.id = params['id'];
    });

    this.recipe = new Recipe();
    this.content = this.sanitized.bypassSecurityTrustHtml(this.recipe.content);
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.id) {
      this.recipeService.get(this.id)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.recipe = new Recipe(body);
          this.content = this.sanitized.bypassSecurityTrustHtml(this.recipe.content);
        });
    }
  }
}

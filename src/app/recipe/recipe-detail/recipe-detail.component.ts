import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Recipe } from '../recipe-core/recipe.model';
import { RecipeService } from '../recipe-core/recipe.service';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/authentication/authentication.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  public editor:any;
  public recipeForm:FormGroup;
  public recipe: Recipe;
  public count: number;
  public id: string;
  public options: any;
  public author:any;

  isLoading: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService:AuthenticationService
  ) {

    this.author = this.authenticationService.user;
    let token = this.authenticationService.credentials.token;

    this.options = {
      imageUploadURL: 'http://localhost:9000/api/images/upload',
      imageManagerLoadURL: 'http://localhost:9000/api/images',
      requestHeaders: { authorization: 'Bearer ' + token }
    }

    this.route.firstChild.firstChild.params
    .subscribe(params => {
      this.id = params['id'];
    });

    this.recipe = new Recipe({
      author: this.author.id
    })

    this.createForm();
  }

  ngOnInit() {
    this.isLoading = true;
    if (this.id && this.id !== 'new') {
      this.recipeService.get(this.id)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.recipe = new Recipe(body);
          this.updateForm();
        });
    }
  }

  createForm() {
    this.recipeForm = this.formBuilder.group({
      title: new FormControl({ value: this.recipe.title, disabled: false}, Validators.required),
      abstract: new FormControl({ value: this.recipe.abstract, disabled: false}, Validators.required),
      badges: new FormControl({ value: this.recipe.badges, disabled: false}),
    });
    this.editor = this.recipe.content;
  }

  updateForm() {
    this.recipeForm.patchValue({
      title: this.recipe.title,
      abstract: this.recipe.abstract,
      badges: this.recipe.badges,
    });

    this.editor = this.recipe.content;
  }

  save () {
    this.recipe.title = this.recipeForm.value.title;
    this.recipe.abstract = this.recipeForm.value.abstract;
    this.recipe.badges = this.recipeForm.value.badges;
    this.recipe.content = this.editor;

    this.isLoading = true;

    if (this.recipe.id) {
      this.recipeService.update(this.recipe)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.recipe = new Recipe(body);
          this.router.navigate(['/recipes']);
        });
    } else {
      this.recipeService.create(this.recipe)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe((body:any) => {
          this.recipe = new Recipe(body);
          this.router.navigate(['/recipes']);
        });
    }
  }
}

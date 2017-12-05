import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { IonicModule } from 'ionic-angular';

import { SharedModule } from '../../shared/shared.module';
import { RecipeReviewComponent } from './recipe-review.component';
import { RecipeService } from '../recipe-core/recipe.service';

describe('RecipeReviewComponent', () => {
  let component: RecipeReviewComponent;
  let fixture: ComponentFixture<RecipeReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(RecipeReviewComponent),
          SharedModule
        ],
        declarations: [RecipeReviewComponent],
        providers: [
          RecipeService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

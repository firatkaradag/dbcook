import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });
  });

  beforeEach(inject([
    RecipeService,
    MockBackend
  ], (_recipeService: RecipeService,
      _mockBackend: MockBackend) => {

    recipeService = _recipeService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getRandomRecipe', () => {
    it('should match recipe title', fakeAsync(() => {
      // Arrange
      const mockRecipe = new Recipe({title:"Mock Recipe"});
      const response = new Response(new ResponseOptions({
        body: { value: mockRecipe }
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomRecipeSubscription = recipeService.create(mockRecipe);
      tick();

      // Assert
      randomRecipeSubscription.subscribe((recipe: Recipe) => {
        expect(recipe.title).toEqual(mockRecipe.title);
      });
    }));
  });
});

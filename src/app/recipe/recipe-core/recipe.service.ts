import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { Recipe } from './recipe.model';

const routes = {
  all: () => '/recipes',
  one: (id:string) => '/recipes/'+id

};

@Injectable()
export class RecipeService {

  constructor(private http: Http) { }

  getAll(): Observable<any[]> {

    return this.http.get(routes.all(), { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not load recipes'))
      );
  }

  get(id:string): Observable<any> {

    return this.http.get(routes.one(id), { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not load the recipe'))
      );
  }

  create(recipe:Recipe): Observable<any> {

    return this.http.post(routes.all(), recipe, { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not create the recipe'))
      );
  }

  update(recipe:Recipe): Observable<any> {

    return this.http.put(routes.one(recipe.id), recipe, { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not update the recipe'))
      );
  }

}

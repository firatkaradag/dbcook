import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

import { Author } from './author.model';

const routes = {
  all: () => '/users',
  one: (id:string) => '/users/'+id

};

@Injectable()
export class AuthorService {

  constructor(private http: Http) { }

  getAll(): Observable<any[]> {

    return this.http.get(routes.all(), { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not load authors'))
      );
  }

  get(id:string): Observable<any[]> {

    return this.http.get(routes.one(id), { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not load the author'))
      );
  }

  create(author:Author): Observable<any> {

    return this.http.post(routes.all(), author, { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not create the author'))
      );
  }

  update(author:Author): Observable<any> {

    return this.http.put(routes.one(author.id), author, { cache: false })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body),
        catchError(() => Observable.of('Error, could not update the author'))
      );
  }

}

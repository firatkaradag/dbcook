import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';

const routes = {
  all: () => `/info`
};

@Injectable()
export class InfoService {

  constructor(private http: Http) { }

  getInfo(): Observable<any> {

    return this.http.get(routes.all(), { cache: true })
      .pipe(
        map((res: Response) => res.json()),
        map(body => body.value),
        catchError(() => Observable.of('Error, could not load any info'))
      );
  }

}

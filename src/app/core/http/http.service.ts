import { Injectable } from '@angular/core';
import {
  Http, ConnectionBackend, RequestOptions, Request, Response, Headers, RequestOptionsArgs, RequestMethod, ResponseOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';
import { extend } from 'lodash';

import { AuthenticationService } from '../authentication/authentication.service';
import { environment } from '../../../environments/environment';
import { Logger } from '../logger.service';
import { HttpCacheService } from './http-cache.service';
import { HttpCachePolicy } from './request-options-args';

const log = new Logger('HttpService');

/**
 * Provides a base framework for http service extension.
 * The default extension adds support for API prefixing, request caching and default error handler.
 */
@Injectable()
export class HttpService extends Http {

  constructor(backend: ConnectionBackend,
              private defaultOptions: RequestOptions,
              private httpCacheService: HttpCacheService) {
    // Customize default options here if needed
    super(backend, defaultOptions);
  }

  /**
   * Performs any type of http request.
   * You can customize this method with your own extended behavior.
   */
  request(request: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    options = options || {};
    let url: string;

    if (typeof request === 'string') {
      url = request;
      request = environment.serverUrl + url;
    } else {
      url = request.url;
      request.url = environment.serverUrl + url;
    }

    if (!options.cache) {
      // Do not use cache
      return this.httpRequest(request, options);
    } else {
      return new Observable((subscriber: Subscriber<Response>) => {
        const cachedData = options.cache === HttpCachePolicy.Update ? null : this.httpCacheService.getCacheData(url);
        if (cachedData !== null) {
          // Create new response to avoid side-effects
          subscriber.next(new Response(cachedData));
          subscriber.complete();
        } else {
          this.httpRequest(request, options).subscribe(
            (response: Response) => {
              // Store the serializable version of the response
              this.httpCacheService.setCacheData(url, null, new ResponseOptions({
                body: response.text(),
                status: response.status,
                headers: response.headers,
                statusText: response.statusText,
                type: response.type,
                url: response.url
              }));
              subscriber.next(response);
            },
            (error) => subscriber.error(error),
            () => subscriber.complete()
          );
        }
      });
    }
  }

  queryUrl (type:string, url:string):string {

    if (type === "auth") {
      let token = "access_token=" + environment.serverKey;
      url = url.indexOf("?") !== -1 ? url + token : url + "?" + token;
    }

    return url;
  }

  authHeader (type:string, token:string):Headers {

    let headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
      'accept': 'application/json; charset=utf-8'
    });

    if (type === "jwt") headers.append('authorization', 'Bearer ' + token);
    if (type === "master") headers.append('authorization', "Bearer " + token);
    if (type === "auth") headers.append('authorization', "Basic " + token);

    return headers;
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    options = this.jwtOption(options);
    return this.request(url, extend({}, options, { method: RequestMethod.Get }));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

    let isAuth = "/auth" === url;
    let headers:Headers = isAuth ? this.authHeader("auth", body.access_token) : this.authHeader("master", environment.serverKey);
    if (isAuth) {
      url = this.queryUrl('auth', url);
      body = {};
    }

    return this.request(url, extend({}, options, {
      body: body,
      method: RequestMethod.Post,
      headers: headers
    }));
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

    options = this.jwtOption(options);
    return this.request(url, extend({}, options, {
      body: body,
      method: RequestMethod.Put
    }));
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Delete }));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, {
      body: body,
      method: RequestMethod.Patch
    }));
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Head }));
  }

  options(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return this.request(url, extend({}, options, { method: RequestMethod.Options }));
  }

  // Customize the default behavior for all http requests here if needed
  private httpRequest(request: string|Request, options: RequestOptionsArgs): Observable<Response> {
    let req = super.request(request, options);
    if (!options.skipErrorHandler) {
      req = req.pipe(catchError(error => this.errorHandler(error)));
    }
    return req;
  }

  // Customize the default error handler here if needed
  private errorHandler(response: Response): Observable<Response> {
    if (environment.production) {
      // Avoid unchaught exceptions on production
      log.error('Request error', response);
      return _throw(response);
    }
    throw response;
  }

  private jwtOption(options?:RequestOptionsArgs):RequestOptionsArgs {

    const auth = new AuthenticationService();
    let token = (auth && auth.credentials) ? auth.credentials.token : null;
    let headers:Headers = this.authHeader("jwt", token);

    return extend(options, { headers: headers });
  }

}

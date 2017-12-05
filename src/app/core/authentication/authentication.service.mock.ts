import { Observable } from 'rxjs/Observable';

import { User, Credentials, LoginContext } from './authentication.service';

export class MockAuthenticationService {

  user: User = {
    id: "0",
    email: "firat@dbcook.com",
    name: "firat",
    picture: "assets/images/author.png",
    createdAt: ""
  }

  credentials: Credentials = {
    token: 'firat@dbcook.com:123456',
    user: this.user
  };

  login(context: LoginContext): Observable<Credentials> {
    return Observable.of({
      token: context.token,
      user: context.user
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return Observable.of(true);
  }

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

}

import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { AuthenticationService, User } from './authentication.service';

const credentialsKey = 'credentials';

describe('AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let user: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  beforeEach(inject([
    AuthenticationService
  ], (_authenticationService: AuthenticationService) => {
    authenticationService = _authenticationService;
    user = {
      id: "0",
      email: "firat@dbcook.com",
      name: "firat",
      picture: "assets/images/author.png",
      createdAt: "",
      role: "user"
    }
  }));

  afterEach(() => {
    // Cleanup
    localStorage.removeItem(credentialsKey);
    sessionStorage.removeItem(credentialsKey);
  });

  describe('login', () => {
    it('should return credentials', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        token: 'firat@dbcook.com:123456',
        user: user
      });
      tick();

      // Assert
      request.subscribe(credentials => {
        expect(credentials).toBeDefined();
        expect(credentials.token).toBeDefined();
      });
    }));

    it('should authenticate user', fakeAsync(() => {
      expect(authenticationService.isAuthenticated()).toBe(false);

      // Act
      const request = authenticationService.login({
        token: 'firat@dbcook.com:123456',
        user: user
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(authenticationService.isAuthenticated()).toBe(true);
        expect(authenticationService.credentials).toBeDefined();
        expect(authenticationService.credentials).not.toBeNull();
        expect(authenticationService.credentials.token).toBeDefined();
        expect(authenticationService.credentials.token).not.toBeNull();
      });
    }));

    it('should persist credentials for the session', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        token: 'firat@dbcook.com:123456',
        user: user
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(sessionStorage.getItem(credentialsKey)).not.toBeNull();
      });
    }));

    it('should persist credentials across sessions', fakeAsync(() => {
      // Act
      const request = authenticationService.login({
        token: 'firat@dbcook.com:123456',
        user: user,
        remember: true
      });
      tick();

      // Assert
      request.subscribe(() => {
        expect(localStorage.getItem(credentialsKey)).not.toBeNull();
      });
    }));
  });

  describe('logout', () => {
    it('should clear user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        token: 'firat@dbcook.com:123456',
        user: user
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        expect(authenticationService.isAuthenticated()).toBe(true);

        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {
          expect(authenticationService.isAuthenticated()).toBe(false);
          expect(authenticationService.credentials).toBeNull();
          expect(sessionStorage.getItem(credentialsKey)).toBeNull();
          expect(localStorage.getItem(credentialsKey)).toBeNull();
        });
      });
    }));

    it('should clear persisted user authentication', fakeAsync(() => {
      // Arrange
      const loginRequest = authenticationService.login({
        token: 'firat@dbcook.com:123456',
        user: user,
        remember: true
      });
      tick();

      // Assert
      loginRequest.subscribe(() => {
        expect(authenticationService.isAuthenticated()).toBe(true);

        const request = authenticationService.logout();
        tick();

        request.subscribe(() => {
          expect(authenticationService.isAuthenticated()).toBe(false);
          expect(authenticationService.credentials).toBeNull();
          expect(sessionStorage.getItem(credentialsKey)).toBeNull();
          expect(localStorage.getItem(credentialsKey)).toBeNull();
        });
      });
    }));
  });
});

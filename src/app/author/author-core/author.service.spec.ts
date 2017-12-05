import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { Author } from './author.model';
import { AuthorService } from './author.service';

describe('AuthorService', () => {
  let authorService: AuthorService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthorService,
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
    AuthorService,
    MockBackend
  ], (_authorService: AuthorService,
      _mockBackend: MockBackend) => {

    authorService = _authorService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getRandomAuthor', () => {
    it('should create an author', fakeAsync(() => {
      // Arrange
      const mockAuthor = new Author({email: 'firat@dbcook.com'});
      const response = new Response(new ResponseOptions({
        body: { value: mockAuthor }
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const authorSubscription = authorService.create(mockAuthor);
      tick();

      // Assert
      authorSubscription.subscribe((author: Author) => {
        expect(author).toEqual(mockAuthor);
      });
    }));
  });
});

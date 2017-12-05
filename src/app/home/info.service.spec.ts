import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';

import { InfoService } from './info.service';

describe('InfoService', () => {
  let infoService: InfoService;
  let mockBackend: MockBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InfoService,
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
    InfoService,
    MockBackend
  ], (_infoService: InfoService,
      _mockBackend: MockBackend) => {

    infoService = _infoService;
    mockBackend = _mockBackend;
  }));

  afterEach(() => {
    mockBackend.verifyNoPendingRequests();
  });

  describe('getRandomInfo', () => {
    it('should return a random Chuck Norris info', fakeAsync(() => {
      // Arrange
      const mockInfo = 'a random info';
      const response = new Response(new ResponseOptions({
        body: { value: mockInfo }
      }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockRespond(response));

      // Act
      const randomInfoSubscription = infoService.getInfo();
      tick();

      // Assert
      randomInfoSubscription.subscribe((info: string) => {
        expect(info).toEqual(mockInfo);
      });
    }));

    it('should return a string in case of error', fakeAsync(() => {
      // Arrange
      const response = new Response(new ResponseOptions({ status: 500 }));
      mockBackend.connections.subscribe((connection: MockConnection) => connection.mockError(response as any));

      // Act
      const randomInfoSubscription = infoService.getInfo();
      tick();

      // Assert
      randomInfoSubscription.subscribe((info: string) => {
        expect(typeof info).toEqual('string');
        expect(info).toContain('Error');
      });
    }));
  });
});

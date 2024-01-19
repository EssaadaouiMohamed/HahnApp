import { TestBed } from '@angular/core/testing';

import { HttpService } from './http-service-provider.service';

describe('HttpInterceptorService', () => {
  let service: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

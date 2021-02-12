import { TestBed } from '@angular/core/testing';

import { RequestInterseptorService } from './request-interseptor.service';

describe('RequestInterseptorService', () => {
  let service: RequestInterseptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestInterseptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

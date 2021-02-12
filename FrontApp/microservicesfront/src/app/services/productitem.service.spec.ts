import { TestBed } from '@angular/core/testing';

import { ProductitemService } from './productitem.service';

describe('ProductitemService', () => {
  let service: ProductitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

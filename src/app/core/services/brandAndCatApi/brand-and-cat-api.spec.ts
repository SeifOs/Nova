import { TestBed } from '@angular/core/testing';

import { BrandAndCatApi } from './brand-and-cat-api';

describe('BrandAndCatApi', () => {
  let service: BrandAndCatApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandAndCatApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

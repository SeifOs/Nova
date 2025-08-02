import { TestBed } from '@angular/core/testing';

import { WishListApi } from './wish-list-api';

describe('WishListApi', () => {
  let service: WishListApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishListApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

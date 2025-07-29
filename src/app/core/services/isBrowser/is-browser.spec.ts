import { TestBed } from '@angular/core/testing';

import { IsBrowser } from './is-browser';

describe('IsBrowser', () => {
  let service: IsBrowser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsBrowser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

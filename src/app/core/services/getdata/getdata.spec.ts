import { TestBed } from '@angular/core/testing';

import { Getdata } from './getdata';

describe('Getdata', () => {
  let service: Getdata;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Getdata);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

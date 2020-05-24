import { TestBed } from '@angular/core/testing';

import { ImgInfoService } from './img-info.service';

describe('ImgInfoService', () => {
  let service: ImgInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

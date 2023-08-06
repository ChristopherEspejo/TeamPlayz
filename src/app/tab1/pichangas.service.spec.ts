import { TestBed } from '@angular/core/testing';

import { PichangasService } from './pichangas.service';

describe('PichangasService', () => {
  let service: PichangasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PichangasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

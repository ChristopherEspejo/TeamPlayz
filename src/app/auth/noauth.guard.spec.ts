import { TestBed } from '@angular/core/testing';

import { NoAuthGuard } from './noauth-guard.guard';

describe('NoauthGuard', () => {
  let guard: NoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

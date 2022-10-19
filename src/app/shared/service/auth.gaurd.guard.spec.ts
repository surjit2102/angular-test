import { TestBed } from '@angular/core/testing';

import { Auth.GaurdGuard } from './auth.gaurd.guard';

describe('Auth.GaurdGuard', () => {
  let guard: Auth.GaurdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Auth.GaurdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

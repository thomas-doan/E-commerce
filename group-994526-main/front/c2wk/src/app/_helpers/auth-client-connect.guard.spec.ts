import { TestBed } from '@angular/core/testing';

import { AuthClientConnectGuard } from './auth-client-connect.guard';

describe('AuthClientConnectGuard', () => {
  let guard: AuthClientConnectGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthClientConnectGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

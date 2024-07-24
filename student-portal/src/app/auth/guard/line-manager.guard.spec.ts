import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { lineManagerGuard } from './line-manager.guard';

describe('lineManagerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => lineManagerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { internGuard } from './intern.guard';

describe('internGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => internGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

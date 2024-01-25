import { TestBed } from '@angular/core/testing';

import { CustomSnackbarService } from './snack-bar.service';

describe('SnackBarService', () => {
  let service: CustomSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

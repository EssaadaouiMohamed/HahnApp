import { TestBed } from '@angular/core/testing';

import { EmoployeeService } from './emoployee.service';

describe('EmoployeeService', () => {
  let service: EmoployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmoployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

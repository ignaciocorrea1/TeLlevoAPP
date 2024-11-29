import { TestBed } from '@angular/core/testing';

import { ApicontrollerService } from './apicontroller.service';
import { provideHttpClient } from '@angular/common/http';

describe('ApicontrollerService', () => {
  let service: ApicontrollerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    }).compileComponents;
    service = TestBed.inject(ApicontrollerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

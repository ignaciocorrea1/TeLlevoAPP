import { TestBed } from '@angular/core/testing';

import { GeolocationService } from './geolocation.service';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';

describe('GeolocationService', () => {
  let service: GeolocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [provideHttpClient()]
    });
    service = TestBed.inject(GeolocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

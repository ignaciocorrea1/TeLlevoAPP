import { TestBed } from '@angular/core/testing';

import { MapaService } from './mapa.service';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';

describe('MapaService', () => {
  let service: MapaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();
    service = TestBed.inject(MapaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

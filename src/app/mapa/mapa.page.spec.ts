import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaPage } from './mapa.page';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

/* const mockRouter = {
  getCurrentNavigation: () => ({
    extras: {
      state: { lng: 100, lat: 50 } // Datos simulados
    }
  })
}; */

// prvider: { provide: Router, useValue: mockRouter }

describe('MapaPage', () => {
  let component: MapaPage;
  let fixture: ComponentFixture<MapaPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ MapaPage ],
      imports: [IonicModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(MapaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

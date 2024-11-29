import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeCreadoPage } from './viaje-creado.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';

describe('ViajeCreadoPage', () => {
  let component: ViajeCreadoPage;
  let fixture: ComponentFixture<ViajeCreadoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajeCreadoPage ],
      imports: [IonicModule.forRoot(),IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(ViajeCreadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

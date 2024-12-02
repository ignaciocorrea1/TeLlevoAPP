import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoPage } from './estado.page';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';

describe('EstadoPage', () => {
  let component: EstadoPage;
  let fixture: ComponentFixture<EstadoPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoPage ],
      imports: [IonicModule.forRoot(),IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    })
    fixture = TestBed.createComponent(EstadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

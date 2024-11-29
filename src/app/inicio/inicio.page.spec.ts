import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InicioPage } from './inicio.page';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('InicioPage', () => {
  let component: InicioPage;
  let fixture: ComponentFixture<InicioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioPage],
      imports: [IonicModule.forRoot(),IonicStorageModule.forRoot()],
      providers:[provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(InicioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

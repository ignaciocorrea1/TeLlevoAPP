import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmarPage } from './confirmar.page';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('ConfirmarPage', () => {
  let component: ConfirmarPage;
  let fixture: ComponentFixture<ConfirmarPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarPage ],
      imports: [IonicModule.forRoot(),IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesdisponiblesPage } from './viajesdisponibles.page';
import { IonicModule } from '@ionic/angular';
import { provideHttpClient } from '@angular/common/http';

describe('ViajesdisponiblesPage', () => {
  let component: ViajesdisponiblesPage;
  let fixture: ComponentFixture<ViajesdisponiblesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ViajesdisponiblesPage ],
      imports: [IonicModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();
    fixture = TestBed.createComponent(ViajesdisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

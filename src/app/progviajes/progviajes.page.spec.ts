import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgviajesPage } from './progviajes.page';
import { provideHttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

describe('ProgviajesPage', () => {
  let component: ProgviajesPage;
  let fixture: ComponentFixture<ProgviajesPage>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [ ProgviajesPage ],
      imports: [IonicStorageModule.forRoot()],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

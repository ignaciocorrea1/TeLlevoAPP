import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajesdisponiblesPage } from './viajesdisponibles.page';

describe('ViajesdisponiblesPage', () => {
  let component: ViajesdisponiblesPage;
  let fixture: ComponentFixture<ViajesdisponiblesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajesdisponiblesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

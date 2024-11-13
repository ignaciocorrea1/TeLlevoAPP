import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgviajesPage } from './progviajes.page';

describe('ProgviajesPage', () => {
  let component: ProgviajesPage;
  let fixture: ComponentFixture<ProgviajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgviajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

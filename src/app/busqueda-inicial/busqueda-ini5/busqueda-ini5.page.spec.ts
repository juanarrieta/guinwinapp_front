import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaIni5Page } from './busqueda-ini5.page';

describe('BusquedaIni5Page', () => {
  let component: BusquedaIni5Page;
  let fixture: ComponentFixture<BusquedaIni5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusquedaIni5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

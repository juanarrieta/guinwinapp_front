import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaIni2Page } from './busqueda-ini2.page';

describe('BusquedaIni2Page', () => {
  let component: BusquedaIni2Page;
  let fixture: ComponentFixture<BusquedaIni2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusquedaIni2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

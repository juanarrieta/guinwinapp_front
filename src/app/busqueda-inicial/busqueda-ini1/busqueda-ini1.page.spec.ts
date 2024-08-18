import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaIni1Page } from './busqueda-ini1.page';

describe('BusquedaIni1Page', () => {
  let component: BusquedaIni1Page;
  let fixture: ComponentFixture<BusquedaIni1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusquedaIni1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

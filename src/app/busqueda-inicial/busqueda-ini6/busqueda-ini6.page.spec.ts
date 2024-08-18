import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaIni6Page } from './busqueda-ini6.page';

describe('BusquedaIni6Page', () => {
  let component: BusquedaIni6Page;
  let fixture: ComponentFixture<BusquedaIni6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusquedaIni6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

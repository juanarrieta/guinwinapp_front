import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BusquedaIni3Page } from './busqueda-ini3.page';

describe('BusquedaIni3Page', () => {
  let component: BusquedaIni3Page;
  let fixture: ComponentFixture<BusquedaIni3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BusquedaIni3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

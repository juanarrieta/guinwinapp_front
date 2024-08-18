import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialBusquedaPage } from './historial-busqueda.page';

describe('HistorialBusquedaPage', () => {
  let component: HistorialBusquedaPage;
  let fixture: ComponentFixture<HistorialBusquedaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialBusquedaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

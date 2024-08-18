import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestorPublicacionesPage } from './gestor-publicaciones.page';

describe('GestorPublicacionesPage', () => {
  let component: GestorPublicacionesPage;
  let fixture: ComponentFixture<GestorPublicacionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GestorPublicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

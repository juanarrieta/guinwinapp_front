import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuzonMensajesPage } from './buzon-mensajes.page';

describe('BuzonMensajesPage', () => {
  let component: BuzonMensajesPage;
  let fixture: ComponentFixture<BuzonMensajesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BuzonMensajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

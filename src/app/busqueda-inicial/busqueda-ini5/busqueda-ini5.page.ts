import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda-ini5',
  templateUrl: './busqueda-ini5.page.html',
  styleUrls: ['./busqueda-ini5.page.scss'],
})
export class BusquedaIni5Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  guardarSeleccion(opcion: any){
    localStorage.setItem('modulo',opcion);
  }
}

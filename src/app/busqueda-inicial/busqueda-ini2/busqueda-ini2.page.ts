import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-busqueda-ini2',
  templateUrl: './busqueda-ini2.page.html',
  styleUrls: ['./busqueda-ini2.page.scss'],
})
export class BusquedaIni2Page implements OnInit {

  isBotonDeshabilitado = true;
  pais = localStorage.getItem('pais');
  departamentos:any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getDepartamentos().subscribe(res =>{
      this.departamentos = res;
    })
  }

  guardarSeleccion(event: any){
    const selectedValue = event.detail.value;
    if(selectedValue != undefined){
     this.isBotonDeshabilitado = false;
     localStorage.setItem('departamento',selectedValue);
    }
  } 

  getDepartamentos(){
    var url_api = environment.url_api +"getDepartamentos/"+this.pais; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    )
  }
}

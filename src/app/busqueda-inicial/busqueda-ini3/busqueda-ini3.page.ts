import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-busqueda-ini3',
  templateUrl: './busqueda-ini3.page.html',
  styleUrls: ['./busqueda-ini3.page.scss'],
})
export class BusquedaIni3Page implements OnInit {

  isBotonDeshabilitado = true;
  departamento = localStorage.getItem('departamento');
  ciudades:any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getCiudades().subscribe(res =>{
      this.ciudades = res;
    })
  }

  guardarSeleccion(event: any){
    const selectedValue = event.detail.value;
    if(selectedValue != undefined){
     this.isBotonDeshabilitado = false;
     localStorage.setItem('ciudad',selectedValue);
    }
  } 

  getCiudades(){
    var url_api = environment.url_api +"getCiudades/"+this.departamento; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    )
  }
}

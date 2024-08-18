import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { of } from 'rxjs';

@Component({
  selector: 'app-busqueda-ini1',
  templateUrl: './busqueda-ini1.page.html',
  styleUrls: ['./busqueda-ini1.page.scss'],
})
export class BusquedaIni1Page implements OnInit {

  paises:any = [];
  isBotonDeshabilitado = true;

  constructor(
     private http: HttpClient
    ) { }

  ngOnInit() {
    this.getPaises().subscribe((res: any) =>{
      this.paises = res;
    })
  }

  getPaises(){    
    var url_api = environment.url_api + "getPaises"; 

    return this.http
    .get(url_api)
    .pipe(
      map((res: any) => {
        return res;
    }),
    catchError((error: any) => {
        // Puedes realizar acciones específicas para manejar el error aquí
        alert('Ocurrió un error:'+ JSON.stringify(error));
        
        // Puedes lanzar un nuevo observable con un valor predeterminado o realizar otras acciones
        return of(null); // Retorna un observable con un valor nulo, puedes ajustarlo según tus necesidades
      })
    );  
  }

  guardarSeleccion(event: any){
    const selectedValue = event.detail.value;
    if(selectedValue != undefined){
      this.isBotonDeshabilitado = false;
      localStorage.setItem('pais',selectedValue);
    }     
  }  
}

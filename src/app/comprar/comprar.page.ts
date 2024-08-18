import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-comprar',
  templateUrl: './comprar.page.html',
  styleUrls: ['./comprar.page.scss'],
})
export class ComprarPage implements OnInit {

  publicaciones:any = [];
  listPublicaciones: any;

  constructor(
       private http: HttpClient
      ) { }

  ngOnInit() {   
    this.getPublicaciones().subscribe(res =>{
      this.publicaciones = res;
      this.listPublicaciones = this.publicaciones;
    });

    setTimeout(() => {
      document.querySelector('app-comprar')?.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }
  
  getPublicaciones(){  
    const departamento = localStorage.getItem('departamento')?localStorage.getItem('departamento'):'null';
    const ciudad = localStorage.getItem('ciudad')?localStorage.getItem('ciudad'):'null';
    const modulo = localStorage.getItem('modulo')?localStorage.getItem('modulo'):'null';
    const precios = localStorage.getItem('precios')?localStorage.getItem('precios'):'null';
    const palabraClave = localStorage.getItem('palabraClave')?localStorage.getItem('palabraClave'):'null';
    const orden = localStorage.getItem('orden')?localStorage.getItem('orden'):'null';
    const idUsuario = localStorage.getItem('idUsuario')?localStorage.getItem('idUsuario'):'null';

    var url_api = environment.url_api +"getPublicaciones/"+departamento+"/"+ciudad+"/"+modulo+"/"+precios+"/"+palabraClave+"/"+orden+"/"+idUsuario; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  buscarPublicacion(event: any){
    const text = event.target.value;
    this.listPublicaciones = this.publicaciones;

    if(text && text.trim() != ''){
      this.listPublicaciones = this.listPublicaciones.filter((publicacion: any)=>{
        return (publicacion.nombre.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  refrescar(event: any){
    this.getPublicaciones();
    
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}

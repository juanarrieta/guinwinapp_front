import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.page.html',
  styleUrls: ['./filtros.page.scss'],
})
export class FiltrosPage implements OnInit {

  departamentos:any = [];
  ciudades:any = [];
  palabraClave: any = '';
  selDepartamento: any = null;
  selCiudad: any = null;
  selModulo: any = null;
  selPrecio: any = null;
  selOrden: any = null;
  
  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.palabraClave = ' ';
    
    this.getDepartamentos().subscribe(res =>{
      this.departamentos = res;
    })
     
    this.selDepartamento = localStorage.getItem('departamento');
    if(this.selDepartamento){
      this.getCiudades(this.selDepartamento).subscribe(res =>{
        this.ciudades = res;      
      }) 
    }
    this.selCiudad = localStorage.getItem('ciudad');   
    this.selModulo = localStorage.getItem('modulo');
    this.selPrecio = localStorage.getItem('precios');
    this.selOrden = localStorage.getItem('orden');
    this.palabraClave = localStorage.getItem('palabraClave'); 
       
    setTimeout(() => {
      document.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }

  getDepartamentos(){
    var url_api = environment.url_api +"getDepartamentos/1"; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    )
  }

  cargarCiudades(event: any){    
    const departamento = event.detail.value;
    localStorage.setItem('departamento',departamento);
    localStorage.setItem('ciudad','');
    this.selCiudad = null;

    this.getCiudades(departamento).subscribe(res =>{
      this.ciudades = res;      
    })    
  }

  getCiudades(departamento: any){
    var url_api = environment.url_api +"getCiudades/"+departamento; 

    return this.http     
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    );
  }

  guardarCiudad(event: any){
    const ciudad = event.detail.value;
    localStorage.setItem('ciudad',ciudad);
  }

  guardarModulo(event: any){
    localStorage.setItem('modulo',event.detail.value);
  }

  guardarPrecios(event: any){
    localStorage.setItem('precios',event.detail.value);
  }

  guardarOrden(event: any){
    localStorage.setItem('orden',event.detail.value);
  }

  guardarFiltros(){   
    localStorage.setItem('palabraClave',this.palabraClave); 
    this.router.navigate(['/comprar']);
  }

  limpiarFiltros(){
    this.selDepartamento = localStorage.setItem('departamento','');    
    this.selCiudad = localStorage.setItem('ciudad',''); 
    this.selModulo = localStorage.setItem('modulo','');
    this.selPrecio = localStorage.setItem('precios','');
    this.selOrden = localStorage.setItem('orden','');
    this.palabraClave = localStorage.setItem('palabraClave','');   
    this.ciudades = []; 
  }
}

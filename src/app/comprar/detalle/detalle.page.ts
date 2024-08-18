import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  idPublicacion: any;
  nombre: any;
  precio: any;
  vendedor: any;
  idVendedor: any;
  idComprador: any;
  descripcion: any;
  ciudad: any;
  fotos: any;
  imagenes: any = [];
  chat:boolean = true;
  
  constructor(
     private activatedRoute: ActivatedRoute
    ,private http: HttpClient
  ) { }

  ngOnInit() {
    this.idPublicacion = this.activatedRoute.snapshot.paramMap.get("idPublicacion");
    this.idComprador = localStorage.getItem('idUsuario');

    //Se busca la ciudad 
      this.getPublicacion().subscribe(async res =>{
        if(res[0]){
          this.nombre = res[0]['NOMBRE'];
          this.precio = res[0]['PRECIO'];
          this.vendedor = res[0]['VENDEDOR'];
          this.idVendedor = res[0]['IDVENDEDOR'];        
          this.descripcion = res[0]['DESCRIPCION'];
          this.fotos = res[0]['FOTOS'];
          this.ciudad = res[0]['CIUDAD'];
  
          //se crea el array de las fotos que seran mostradas
          const fotosA: string[] = this.fotos.split('/');
  
          this.imagenes = [
            '../../assets/images/'+fotosA[0],
            '../../assets/images/'+fotosA[1],
            '../../assets/images/'+fotosA[2],
            '../../assets/images/'+fotosA[3],
          ];
  
          if(this.idVendedor == this.idComprador)
            this.chat = false;       
        }        
      })    

    //Se realiza el registro de la consulta en el historial
    this.guardarHistorial().subscribe(res =>{
    })

    setTimeout(() => {
      document.querySelector('app-detalle')?.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }


  getPublicacion(){
    var url_api = environment.url_api +"getPublicacion/"+this.idPublicacion; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{ 
        return res;
      })
    )
  }

  guardarHistorial(){
    var url_api = environment.url_api +"guardarHistorial"; 
   
    const data = {
      idPublicacion: this.idPublicacion
     ,idComprador: this.idComprador
   };

   const headers = new HttpHeaders({
     'Content-Type': 'application/json'
   });

   return this.http
     .post(url_api, data, { headers })
     .pipe(
       map((res: any) => {       
         return res;
       })
     );
  }
}

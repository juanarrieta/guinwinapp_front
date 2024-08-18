import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-historial-busqueda',
  templateUrl: './historial-busqueda.page.html',
  styleUrls: ['./historial-busqueda.page.scss'],
})
export class HistorialBusquedaPage implements OnInit {

  listPublicaciones: any;
  publicaciones:any = [];

  constructor(
     private http: HttpClient
    ,private alertController: AlertController
  ) { }
  
  ngOnInit() {
    this.getMisPublicaciones().subscribe((res: any) =>{
      this.publicaciones = res;
      this.listPublicaciones = this.publicaciones;
    })

    setTimeout(() => {
      document.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }

  getMisPublicaciones(){  
    var url_api = environment.url_api +"getHistorialBusqueda/"+localStorage.getItem('idUsuario'); 

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
    this.getMisPublicaciones();
    
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  async eliminarDelHistorial(idPublicacion: any){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea eliminar la publicacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.eliminarDelHistorialBD(idPublicacion).subscribe(async res =>{
              if(res){
                const alert = await this.alertController.create({
                  message: res,
                  buttons: ['OK']
                });
                await alert.present();
              }
              else{
                location.reload();
              }
            })
          }
        }
      ]
    });
	
	  await alert.present();
  }

  eliminarDelHistorialBD(idPublicacion: any){
    var url_api = environment.url_api +"eliminarDelHistorialBD/"+idPublicacion+"/"+localStorage.getItem('idUsuario'); 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

}

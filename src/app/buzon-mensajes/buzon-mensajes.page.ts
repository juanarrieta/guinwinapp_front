import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-buzon-mensajes',
  templateUrl: './buzon-mensajes.page.html',
  styleUrls: ['./buzon-mensajes.page.scss'],
})

export class BuzonMensajesPage implements OnInit {

  mensajes2:any = [];
  mensajes: any;
  usuario: any;

  constructor(
       private http: HttpClient    
      ,private alertController: AlertController
    ) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('idUsuario');
    
    this.getMensajes().subscribe(res =>{
      this.mensajes2 = res;
      this.mensajes = this.mensajes2;
    })

    setTimeout(() => {
      document.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);   
  }

  getMensajes(){
    var url_api = environment.url_api +"getMensajes/"+localStorage.getItem('idUsuario'); 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res.res;
      })
    )
  }

  doRefresh(event: any){
    this.getMensajes();
    
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  buscarMensajes(event: any){
    const text = event.target.value;
    this.mensajes = this.mensajes2;
    if(text && text.trim() != ''){
      this.mensajes = this.mensajes.filter((user: any)=>{
        return (user.name.toLowerCase().indexOf(text.toLowerCase()) > -1);
      })
    }
  }

  async eliminarChat(idComprador: any, idPublicacion: any){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea eliminar el chat con este usuario?',
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
            this.eliminarChatBD(idComprador, idPublicacion).subscribe(async res =>{
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

  eliminarChatBD(idComprador: any, idPublicacion: any){
    var url_api = environment.url_api +"eliminarChatBD/"+idComprador+"/"+idPublicacion; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

}

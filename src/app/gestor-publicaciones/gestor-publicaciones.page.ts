import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-gestor-publicaciones',
  templateUrl: './gestor-publicaciones.page.html',
  styleUrls: ['./gestor-publicaciones.page.scss'],
})
export class GestorPublicacionesPage implements OnInit {

  listPublicaciones: any;
  publicaciones:any = [];

  constructor(
     private http: HttpClient
    ,private router: Router
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
    var url_api = environment.url_api +"getMisPublicaciones/"+localStorage.getItem('idUsuario'); 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  async eliminarPublicacion(idPublicacion: any){
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
            this.eliminarPublicacionBD(idPublicacion).subscribe(async res =>{
              if(res){
                const alert = await this.alertController.create({
                  header: "¡Error!",
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

  eliminarPublicacionBD(idPublicacion: any){
    var url_api = environment.url_api +"eliminarPublicacionBD/"+idPublicacion; 

    return this.http
    .get(url_api)
    .pipe(
      map((res:any)=>{
        return res;
      })
    )
  }

  editarPublicacion(idPublicacion: any){
    //Esta funcion se implementara en los releases posteriores cuando se vallan a incluir las cuentas pagas
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

  publicar(){
    let msn = "";
    this.validarCuentaPublicacion().subscribe(async res => {
      if(!res.res)
        msn = "Se han alcanzado la cantidad de publicaciones permitidas para este tipo de cuenta.";
      
      if(!msn){
        this.router.navigate(['/publicar']);
      }
      else{
        const alert = await this.alertController.create({
          message: msn,
          buttons: ['OK']
        });
        await alert.present();
      }
    }) 
  }

  validarCuentaPublicacion(){
    const idUsuario = localStorage.getItem('idUsuario');

    var url_api = environment.url_api + "validarCuentaPublicacion/"+ idUsuario;

    return this.http
    .get(url_api)
    .pipe(
      map((res: any) => {
        return res;
      })
    );
  }

}

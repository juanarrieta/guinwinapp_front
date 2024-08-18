import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-busqueda-ini6',
  templateUrl: './busqueda-ini6.page.html',
  styleUrls: ['./busqueda-ini6.page.scss'],
})
export class BusquedaIni6Page implements OnInit {

  modulo = localStorage.getItem('modulo');

  constructor(
       private router: Router
      ,private alertController: AlertController
    ) { }

  ngOnInit() {
  }

  async guardarSeleccion(opcion: any){
    localStorage.setItem('accion',opcion);    

    if(opcion == 1){
      if(localStorage.getItem('usuario')){
        this.router.navigate(['/publicar']);
      }
      else{
        const alert = await this.alertController.create({
          header: 'Confirmación',
          message: 'Para realizar una publicacion debe iniciar sesion primero. ¿Desea iniciar sesion?',
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
                this.router.navigate(['/login']);
              }
            }
          ]
        });

        await alert.present();
      }        
    }    
  }
}

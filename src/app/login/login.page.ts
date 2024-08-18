import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NavController } from '@ionic/angular';
import { AppComponent } from '.././app.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  correo: string = '';
  pwd: string = '';
  usuario: any = '';

  constructor(
     private http: HttpClient
    ,private navCtrl: NavController
    ,private appComponent:AppComponent
    ,private alertController: AlertController
  ) { 
  }

  ngOnInit() {
    if(localStorage.getItem('usuario')){
      localStorage.setItem('usuario','');
      localStorage.setItem('correo','');
      //Borra 5 opciones del menu desde la posicion 4 | primer valor posicion + 1 inicia el borrado, segunda posicion cantidad a borrar  
      this.appComponent.appPages.splice(3,6);
      this.appComponent.appPages.unshift({ title: 'Login', url: '/login', icon: 'people' } );              
    }

    setTimeout(() => {
      document.querySelector('ion-toolbar')?.shadowRoot?.querySelector('.toolbar-background')?.remove();
    }, 1000);    
  }

  async iniciarSesion(){
    let msn = ""

    if(!this.validarCorreoElectronico())
      msn = "EL correo ingresado no es valido.\n";

    if(this.estaVacia(this.pwd))
      msn = msn + "Debe diligenciar el campo Contraseña.\n";

      if(msn){
        const alert = await this.alertController.create({
          message: msn,
          buttons: ['OK']
        });
        await alert.present();
      }
      else{  
        try {  
          this.login().subscribe(async res =>{            
            if(res.mensaje != 'Contraseña incorrecta intente nuevamente.' && res.mensaje != 'El correo ingresado no fue encontrado, porfavor registrese primero.'){
              localStorage.setItem('usuario', res.nombre);
              localStorage.setItem('idUsuario', res.id);
              localStorage.setItem('correo', this.correo);
              this.appComponent.appPages.splice(0,1);
              this.usuario = localStorage.getItem('usuario')?localStorage.getItem('usuario'):'Usuario';
              this.appComponent.appPages.push({ title: this.usuario, url: '/comprar', icon: 'person-circle' } );
              this.appComponent.appPages.push({ title: 'Publicar', url: '/publicar', icon: 'rocket' } );
              this.appComponent.appPages.push({ title: 'Buzon', url: '/buzon-mensajes', icon: 'mail-unread'} );
              this.appComponent.appPages.push({ title: 'Gestor Publicaciones', url: '/gestor-publicaciones', icon: 'briefcase'} );
              this.appComponent.appPages.push({ title: 'Historial Busqueda', url: '/historial-busqueda', icon: 'list'} );
              this.appComponent.appPages.push({ title: 'Cerrar sesion', url: '/login', icon: 'arrow-back-circle' } );              
              this.navCtrl.back();
            }              
            else{
              const alert = await this.alertController.create({
                message: res.mensaje,
                buttons: ['OK']
              });
              await alert.present();
            }              
          }) 
        } catch (error) {
          console.error('Error:', error);
        }
      }
  }

  login(){
    var url_api = environment.url_api +"login"; 

    const data = { 
       pwd: this.pwd
      ,correo: this.correo
    }; 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http     
    .post(url_api, data, { headers })
    .pipe(
      map((res:any)=>{
        return res;
      }) 
    );
  }


  validarCorreoElectronico(): boolean {
    const patronValidacion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return patronValidacion.test(this.correo) && !this.estaVacia(this.correo) ;
  }

  estaVacia(variable: any): boolean {
    return variable === null || variable === undefined || variable === '';
  }

}
